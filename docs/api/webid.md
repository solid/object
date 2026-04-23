# WebID

Wrappers for [WebID profile documents](https://solidproject.org/TR/protocol#webid)
as used by the [Solid Protocol](https://solidproject.org/TR/protocol). The
profile is the document a Solid client fetches from a WebID URI in order to
discover the agent's name, storage roots, OIDC issuer and so on.

Exported from `@solid/object/webid` (and re-exported from `@solid/object`).

```ts
import { Agent, WebIdDataset } from "@solid/object/webid"
```

## `WebIdDataset`

Wraps a whole RDF/JS `DatasetCore` representing a WebID profile document.

`extends DatasetWrapper` (from
[`@rdfjs/wrapper`](https://github.com/rdfjs/wrapper)).

### Construction

```ts
new WebIdDataset(dataset, factory)
```

- `dataset: DatasetCore` — typically an [`n3.Store`](https://github.com/rdfjs/N3.js)
  populated by parsing the profile document.
- `factory: DataFactory` — any RDF/JS-compliant data factory; `n3.DataFactory`
  works.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `mainSubject` | [`Agent`](#agent) \| `undefined` | The first subject in the dataset that has a [`solid:oidcIssuer`](https://solid.github.io/solid-oidc/#discovery) predicate, wrapped as an `Agent`. Returns `undefined` for documents that don't contain an OIDC issuer triple. |

> The current heuristic identifies the WebID by looking for an
> `solid:oidcIssuer` triple. The library author has flagged this as
> incomplete (see the `TODO` in
> [`src/webid/WebIdDataset.ts`](../../src/webid/WebIdDataset.ts)) — a
> [`foaf:primaryTopic`](http://xmlns.com/foaf/spec/#term_primaryTopic)
> / [`foaf:isPrimaryTopicOf`](http://xmlns.com/foaf/spec/#term_isPrimaryTopicOf)
> based path is planned.

### Example

```ts
import { DataFactory, Parser, Store } from "n3"
import { WebIdDataset } from "@solid/object/webid"

const store = new Store()
store.addQuads(new Parser().parse(`
  <https://id.example/alice#me>
    <http://www.w3.org/ns/solid/terms#oidcIssuer> <https://login.example/> ;
    <http://xmlns.com/foaf/0.1/name> "Alice" .
`))

const dataset = new WebIdDataset(store, DataFactory)
console.log(dataset.mainSubject?.name) // "Alice"
```

## `Agent`

Wraps a single agent term — the WebID itself or anything FOAF/vCard-shaped
that lives in the same document.

`extends TermWrapper` (from
[`@rdfjs/wrapper`](https://github.com/rdfjs/wrapper)).

### Construction

Most consumers obtain an `Agent` via `WebIdDataset.mainSubject` rather than
constructing one directly. To construct one manually:

```ts
new Agent(term, dataset, factory)
```

- `term: NamedNode | BlankNode` — the agent's RDF subject.
- `dataset: DatasetCore` — the dataset to read from.
- `factory: DataFactory` — RDF/JS data factory.

### Properties

All properties are read-only getters. Sets are mutable via `@rdfjs/wrapper`'s
`SetFrom` machinery — adding to or deleting from the returned `Set` mutates
the underlying dataset.

| Property | Type | Predicate | Spec |
| --- | --- | --- | --- |
| `name` | `string \| null` | Computed: `vcard:fn` -> `foaf:name` -> the last URL path segment. | [vCard](https://www.w3.org/TR/vcard-rdf/), [FOAF](http://xmlns.com/foaf/spec/#term_name) |
| `vcardFn` | `string \| undefined` | [`vcard:fn`](https://www.w3.org/TR/vcard-rdf/#fn) | vCard "formatted name" |
| `foafName` | `string \| undefined` | [`foaf:name`](http://xmlns.com/foaf/spec/#term_name) | FOAF |
| `organization` | `string \| null` | [`vcard:organization-name`](https://www.w3.org/TR/vcard-rdf/) | vCard |
| `role` | `string \| null` | [`vcard:role`](https://www.w3.org/TR/vcard-rdf/) | vCard |
| `title` | `string \| null` | [`vcard:title`](https://www.w3.org/TR/vcard-rdf/) | vCard |
| `email` | `string \| null` | Convenience: `hasEmail.value`. | vCard |
| `hasEmail` | `HasValue \| undefined` | [`vcard:hasEmail`](https://www.w3.org/TR/vcard-rdf/#hasEmail). The wrapper resolves `vcard:hasValue` if present (e.g. `mailto:alice@example`). | vCard |
| `phone` | `string \| null` | Convenience: `hasTelephone.value`. | vCard |
| `hasTelephone` | `HasValue \| undefined` | [`vcard:hasTelephone`](https://www.w3.org/TR/vcard-rdf/#hasTelephone). | vCard |
| `website` | `string \| null` | Computed: `vcardHasUrl` -> `foafHomepage`. | vCard / FOAF |
| `vcardHasUrl` | `string \| undefined` | [`vcard:hasURL`](https://www.w3.org/TR/vcard-rdf/) | vCard |
| `foafHomepage` | `string \| undefined` | [`foaf:homepage`](http://xmlns.com/foaf/spec/#term_homepage) | FOAF |
| `photoUrl` | `string \| null` | [`vcard:hasPhoto`](https://www.w3.org/TR/vcard-rdf/) | vCard |
| `pimStorage` | `Set<string>` | [`pim:storage`](http://www.w3.org/ns/pim/space#storage) — the agent's storage roots. | [PIM/space](http://www.w3.org/ns/pim/space) |
| `solidStorage` | `Set<string>` | [`solid:storage`](http://www.w3.org/ns/solid/terms#storage) — Solid Protocol storage. | [Solid Protocol §4.1](https://solidproject.org/TR/protocol#storage) |
| `storageUrls` | `Set<string>` | The union of `pimStorage` and `solidStorage`. | — |
| `knows` | `Set<string>` | [`foaf:knows`](http://xmlns.com/foaf/spec/#term_knows) | FOAF |

### Example

```ts
const agent = dataset.mainSubject
if (!agent) throw new Error("WebID profile has no main subject")

console.log(agent.name)
console.log(agent.email)               // null if absent
console.log([...agent.storageUrls])    // string[] of storage roots

// Add a new storage root by mutating the Set:
agent.pimStorage.add("https://storage.example/alice-photos/")
```
