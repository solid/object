# Vocabulary constants

`@solid/object` re-exports a frozen object per RDF namespace it touches. The
values are the full IRI strings; pair them with any `DataFactory.namedNode`
when constructing terms by hand.

```ts
import {
  ACL, ACP, DC, FOAF, ICAL, LDP,
  PIM, POSIX, RDF, RDFS, SOLID, VCARD,
} from "@solid/object"
```

Each export is `as const`, so the property values are typed as their literal
IRI string — useful when comparing against `Set<string>` results from the
wrappers (e.g. `auth.mode.has(ACL.Read)`).

## `ACL`

[Web Access Control vocabulary](http://www.w3.org/ns/auth/acl).

| Constant | IRI | Notes |
| --- | --- | --- |
| `Authorization` | `acl:Authorization` | Class. |
| `AuthenticatedAgent` | `acl:AuthenticatedAgent` | Built-in agent class for any logged-in agent ([WAC §5.2](https://solidproject.org/TR/wac#acl-agentclass-authenticated-agent)). |
| `Append`, `Read`, `Write`, `Control` | `acl:Append`, `acl:Read`, `acl:Write`, `acl:Control` | Access modes ([WAC §3](https://solidproject.org/TR/wac#access-modes)). |
| `accessTo` | `acl:accessTo` | |
| `default` | `acl:default` | |
| `mode` | `acl:mode` | |
| `agent` | `acl:agent` | |
| `agentClass` | `acl:agentClass` | |
| `agentGroup` | `acl:agentGroup` | |
| `origin` | `acl:origin` | |

## `ACP`

[Access Control Policy vocabulary](https://solid.github.io/authorization-panel/acp-specification/).

| Constant | IRI |
| --- | --- |
| `AccessControlResource`, `AccessControl`, `Matcher`, `Policy` | Classes. |
| `accessControl`, `memberAccessControl`, `apply`, `resource`, `mode`, `allow`, `deny` | Predicates on resources, controls and policies. |
| `anyOf`, `allOf`, `noneOf` | Matcher combinators on a `Policy`. |
| `agent`, `client`, `issuer`, `vc` | Matcher predicates. |
| `PublicAgent` | Built-in matcher value: anyone (maps to `foaf:Agent` in WAC). |
| `AuthenticatedAgent` | Built-in matcher value: any signed-in agent (maps to `acl:AuthenticatedAgent` in WAC). |
| `CreatorAgent` | Built-in matcher value: the agent that created the resource. |
| `OwnerAgent` | Built-in matcher value: the agent that owns the storage. |

## `DC`

[Dublin Core Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/).

| Constant | IRI |
| --- | --- |
| `modified` | `dcterms:modified` |
| `title` | `dcterms:title` |

## `FOAF`

[Friend of a Friend](http://xmlns.com/foaf/spec/).

| Constant | IRI | Notes |
| --- | --- | --- |
| `Agent` | `foaf:Agent` | Used in WAC to grant access to anyone ([§5.1](https://solidproject.org/TR/wac#acl-agentclass-foaf-agent)). |
| `name`, `homepage`, `knows`, `email` | Standard FOAF predicates. |
| `isPrimaryTopicOf`, `primaryTopic` | Reserved for future WebID document discovery. |

## `ICAL`

[iCalendar in RDF](http://www.w3.org/2002/12/cal/ical) — minimal subset:
`comment`, `dtend`, `dtstart`, `location`, `summary`. Not yet bound to any
wrapper class but available for downstream consumers building event-shaped
data.

## `LDP`

[Linked Data Platform](https://www.w3.org/TR/ldp/).

| Constant | IRI |
| --- | --- |
| `contains` | `ldp:contains` |

## `PIM`

[Personal Information Model — space](http://www.w3.org/ns/pim/space).

| Constant | IRI |
| --- | --- |
| `storage` | `pim:storage` |

## `POSIX`

[POSIX `stat` vocabulary](http://www.w3.org/ns/posix/stat).

| Constant | IRI |
| --- | --- |
| `size` | `posix:size` |
| `mtime` | `posix:mtime` |

## `RDF`

[RDF 1.1](https://www.w3.org/TR/rdf11-concepts/).

| Constant | IRI |
| --- | --- |
| `type` | `rdf:type` |

## `RDFS`

[RDF Schema 1.1](https://www.w3.org/TR/rdf-schema/).

| Constant | IRI |
| --- | --- |
| `label` | `rdfs:label` |

## `SOLID`

[Solid terms](http://www.w3.org/ns/solid/terms).

| Constant | IRI | Notes |
| --- | --- | --- |
| `oidcIssuer` | `solid:oidcIssuer` | The Solid-OIDC issuer-discovery predicate ([§4](https://solid.github.io/solid-oidc/#discovery)). |
| `storage` | `solid:storage` | The Solid Protocol storage predicate ([§4.1](https://solidproject.org/TR/protocol#storage)). |

## `VCARD`

[W3C vCard Ontology](https://www.w3.org/TR/vcard-rdf/).

| Constant | IRI |
| --- | --- |
| `Email`, `fn`, `email`, `hasEmail`, `value` | Email-related terms. |
| `hasMember` | Group membership. |
| `hasTelephone`, `tel`, `hasValue`, `telephoneType` | Telephone-related terms. |
| `hasUrl`, `hasPhoto`, `organizationName`, `role`, `title`, `phone` | Profile-shaped terms. |
