# Web Access Control (WAC)

Wrappers for the [Web Access Control specification](https://solidproject.org/TR/wac).
WAC is the legacy access-control system inherited from the Linked Data
Platform world; ACL resources sit alongside the resources they protect and
list `acl:Authorization` rules that grant access modes to agents.

Exported from `@solid/object`:

```ts
import { AclResource, Authorization, Group } from "@solid/object"
```

## `AclResource`

Wraps an RDF/JS `DatasetCore` representing an [ACL resource](https://solidproject.org/TR/wac#acl-resource-representation).

`extends DatasetWrapper`.

### Construction

```ts
new AclResource(dataset, factory)
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `authorizations` | `Iterable<`[`Authorization`](#authorization)`>` | Every subject typed `acl:Authorization` in the dataset. Any one of them granting the requested mode permits access. |

## `Authorization`

A single [authorisation rule](https://solidproject.org/TR/wac#authorization-rule).

`extends TermWrapper`.

### Access subjects

| Property | Type | Predicate | Spec |
| --- | --- | --- | --- |
| `agent` | `Set<string>` | [`acl:agent`](https://solidproject.org/TR/wac#acl-agent) | Specific agents granted access. |
| `agentClass` | `Set<string>` | [`acl:agentClass`](https://solidproject.org/TR/wac#acl-agentclass) | Classes of agent — `foaf:Agent` for "anyone", `acl:AuthenticatedAgent` for "anyone signed in". |
| `agentGroup` | [`Group`](#group) \| `undefined` (read/write) | [`acl:agentGroup`](https://solidproject.org/TR/wac#acl-agentgroup) | Group whose `vcard:hasMember` list is granted access. |
| `origin` | `Set<string>` | [`acl:origin`](https://solidproject.org/TR/wac#acl-origin) | HTTP `Origin` values granted access. |

### Access objects

| Property | Type | Predicate | Spec |
| --- | --- | --- | --- |
| `accessTo` | `string \| undefined` (read/write) | [`acl:accessTo`](https://solidproject.org/TR/wac#acl-accessto) | The IRI of the resource being granted access to. |
| `default` | `string \| undefined` (read/write) | [`acl:default`](https://solidproject.org/TR/wac#acl-default) | The container whose authorisation is inherited by descendants. |

### Access modes

| Property | Type | Predicate | Spec |
| --- | --- | --- | --- |
| `mode` | `Set<string>` | [`acl:mode`](https://solidproject.org/TR/wac#acl-mode) | The set of access mode IRIs (`acl:Read`, `acl:Write`, `acl:Append`, `acl:Control`). |

### Type

| Property | Type | Predicate |
| --- | --- | --- |
| `type` | `Set<string>` | `rdf:type` (a conformant authorisation includes `acl:Authorization`). |

### Computed convenience properties

These are derived getters and setters that wrap the lower-level `mode` /
`agentClass` sets.

| Property | Type | Meaning |
| --- | --- | --- |
| `conforms` | `boolean` (read-only) | True iff this authorisation [conforms](https://solidproject.org/TR/wac#authorization-conformance): typed `acl:Authorization`, has both `accessTo` and `default`, has at least one mode, and grants access to at least one subject category. |
| `accessibleToAny` | `boolean` (read/write) | Convenience for `agentClass.has(foaf:Agent)`. |
| `accessibleToAuthenticated` | `boolean` (read/write) | Convenience for `agentClass.has(acl:AuthenticatedAgent)`. |
| `canRead` | `boolean` (read/write) | `mode.has(acl:Read)`. |
| `canWrite` | `boolean` (read/write) | `mode.has(acl:Write)`. |
| `canAppend` | `boolean` (read/write) | `mode.has(acl:Append)`. |
| `canCreate` | `boolean` (read-only) | `canWrite || canAppend`. |
| `canUpdate` | `boolean` (read-only) | Same as `canCreate`. |
| `canDelete` | `boolean` (read/write) | Mirrors `canWrite`. |
| `canReadWriteAcl` | `boolean` (read/write) | `mode.has(acl:Control)`. |

## `Group`

Wraps a [`vcard:Group`](https://www.w3.org/TR/vcard-rdf/#Group) referenced
from `acl:agentGroup`.

`extends TermWrapper`.

| Property | Type | Predicate |
| --- | --- | --- |
| `hasMember` | `Set<string>` | [`vcard:hasMember`](https://www.w3.org/TR/vcard-rdf/#hasMember) — IRIs of group members. |

## Example: enumerate authorisations

```ts
import { DataFactory, Parser, Store } from "n3"
import { AclResource } from "@solid/object"

const store = new Store()
store.addQuads(new Parser().parse(`
  @prefix acl: <http://www.w3.org/ns/auth/acl#> .
  <#owner>  a acl:Authorization ;
            acl:accessTo <https://example/data> ;
            acl:default  <https://example/data> ;
            acl:agent    <https://id.example/alice#me> ;
            acl:mode     acl:Read, acl:Write, acl:Control .
`))

const acl = new AclResource(store, DataFactory)
for (const auth of acl.authorizations) {
  if (!auth.conforms) continue
  console.log("agents:",  [...auth.agent])
  console.log("read:",    auth.canRead, "write:", auth.canWrite,
              "control:", auth.canReadWriteAcl)
}
```

## Example: grant public read access

```ts
import { DataFactory, Store } from "n3"
import { Authorization, ACL, FOAF } from "@solid/object"

const store = new Store()
const auth  = new Authorization(DataFactory.blankNode(), store, DataFactory)

auth.type.add(ACL.Authorization)
auth.accessTo = "https://example/data"
auth.default  = "https://example/data"
auth.canRead  = true
auth.accessibleToAny = true   // adds foaf:Agent to agentClass
```
