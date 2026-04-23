# Access Control Policy (ACP)

Wrappers for the [Access Control Policy specification](https://solid.github.io/authorization-panel/acp-specification/),
the access-control system used by Solid servers that have moved off legacy
WAC.

ACP separates *what* you can do (a `Policy`'s `allow` / `deny` modes) from
*who* you are (a `Matcher`'s constraints over the agent, client, issuer or
verifiable credential). An `AccessControl` ties one or more `Policy`s
together and an `AccessControlResource` (ACR) attaches `AccessControl`s to
the resource they protect.

Exported from `@solid/object/acp` (and re-exported from `@solid/object`).

```ts
import {
  AccessControl,
  AccessControlResource,
  AcrDataset,
  Matcher,
  Policy,
} from "@solid/object/acp"
```

All term wrappers below `extend Typed`, an internal wrapper that exposes a
mutable `type: Set<string>` over `rdf:type`.

## `AcrDataset`

Wraps a whole RDF/JS `DatasetCore` representing an Access Control Resource
document.

`extends DatasetWrapper`.

### Construction

```ts
new AcrDataset(dataset, factory)
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `acr` | [`AccessControlResource`](#accesscontrolresource) \| `undefined` | The first ACR in the dataset. The lookup walks every subject typed `acp:AccessControlResource` plus every subject of `acp:resource`, `acp:accessControl` or `acp:memberAccessControl`. |

## `AccessControlResource`

Wraps the ACR subject — the resource that the access controls apply to. ACP
spec: [§ Access Control Resource](https://solid.github.io/authorization-panel/acp-specification/#resource).

`extends Typed`.

### Properties

| Property | Type | Predicate | Notes |
| --- | --- | --- | --- |
| `resource` | `string \| undefined` (read/write) | [`acp:resource`](https://solid.github.io/authorization-panel/acp-specification/#resource) | The IRI of the protected resource. Setter overwrites. |
| `accessControl` | `Set<AccessControl>` | [`acp:accessControl`](https://solid.github.io/authorization-panel/acp-specification/#access-control) | Controls that apply to the resource itself. |
| `memberAccessControl` | `Set<AccessControl>` | [`acp:memberAccessControl`](https://solid.github.io/authorization-panel/acp-specification/#member-access-control) | Controls that apply to descendants of the resource (containers only). |
| `type` | `Set<string>` | `rdf:type` | Inherited from `Typed`. |

## `AccessControl`

A bundle of policies. ACP spec: [§ Access Control](https://solid.github.io/authorization-panel/acp-specification/#access-control).

`extends Typed`.

| Property | Type | Predicate |
| --- | --- | --- |
| `apply` | `Set<Policy>` | [`acp:apply`](https://solid.github.io/authorization-panel/acp-specification/#apply) |
| `type` | `Set<string>` | `rdf:type` |

## `Policy`

The decision unit: which modes are allowed/denied, and which matcher
combinations (any-of / all-of / none-of) gate the decision. ACP spec:
[§ Policy](https://solid.github.io/authorization-panel/acp-specification/#policy).

`extends Typed`.

| Property | Type | Predicate |
| --- | --- | --- |
| `allow` | `Set<string>` | [`acp:allow`](https://solid.github.io/authorization-panel/acp-specification/#allow) — IRIs of granted access modes. |
| `deny` | `Set<string>` | [`acp:deny`](https://solid.github.io/authorization-panel/acp-specification/#deny) — IRIs of denied access modes. |
| `anyOf` | `Set<Matcher>` | [`acp:anyOf`](https://solid.github.io/authorization-panel/acp-specification/#anyof) |
| `allOf` | `Set<Matcher>` | [`acp:allOf`](https://solid.github.io/authorization-panel/acp-specification/#allof) |
| `noneOf` | `Set<Matcher>` | [`acp:noneOf`](https://solid.github.io/authorization-panel/acp-specification/#noneof) |
| `type` | `Set<string>` | `rdf:type` |

## `Matcher`

Constraints describing which requesters a policy should consider. ACP spec:
[§ Matcher](https://solid.github.io/authorization-panel/acp-specification/#matcher).

`extends Typed`.

| Property | Type | Predicate |
| --- | --- | --- |
| `agent` | `Set<string>` | [`acp:agent`](https://solid.github.io/authorization-panel/acp-specification/#agent) |
| `client` | `Set<string>` | [`acp:client`](https://solid.github.io/authorization-panel/acp-specification/#client) |
| `issuer` | `Set<string>` | [`acp:issuer`](https://solid.github.io/authorization-panel/acp-specification/#issuer) |
| `vc` | `Set<string>` | [`acp:vc`](https://solid.github.io/authorization-panel/acp-specification/#vc) |
| `type` | `Set<string>` | `rdf:type` |

The vocabulary constants module also exports the four well-known agent IRIs
referenced by matchers: [`ACP.PublicAgent`, `ACP.AuthenticatedAgent`,
`ACP.CreatorAgent`, `ACP.OwnerAgent`](vocabulary.md#acp).

## Example: read everything off an ACR

```ts
import { DataFactory, Parser, Store } from "n3"
import { AcrDataset } from "@solid/object/acp"

const store = new Store()
store.addQuads(new Parser().parse(`
  @prefix acp: <http://www.w3.org/ns/solid/acp#> .

  []  acp:resource <https://example/data> ;
      acp:accessControl [
        acp:apply [
          acp:allow <http://www.w3.org/ns/auth/acl#Read> ;
          acp:allOf [
            acp:agent <https://id.example/alice#me>
          ]
        ]
      ] .
`))

const acr = new AcrDataset(store, DataFactory).acr
if (!acr) throw new Error("No ACR found")

for (const ac of acr.accessControl) {
  for (const policy of ac.apply) {
    console.log("allow:", [...policy.allow])
    for (const matcher of policy.allOf) {
      console.log("  agent:", [...matcher.agent])
    }
  }
}
```

## Example: build an ACR from scratch

```ts
import { DataFactory, Store } from "n3"
import {
  AccessControl,
  AccessControlResource,
  Matcher,
  Policy,
} from "@solid/object/acp"
import { ACL } from "@solid/object"

const dataset = new Store()
const acr     = new AccessControlResource(DataFactory.blankNode(), dataset, DataFactory)
const ac      = new AccessControl(DataFactory.blankNode(), dataset, DataFactory)
const policy  = new Policy(DataFactory.blankNode(), dataset, DataFactory)
const matcher = new Matcher(DataFactory.blankNode(), dataset, DataFactory)

acr.resource = "https://example/data"
acr.accessControl.add(ac)
ac.apply.add(policy)
policy.allow.add(ACL.Read)
policy.allOf.add(matcher)
matcher.agent.add("https://id.example/alice#me")
```
