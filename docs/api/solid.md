# Solid resources

Wrappers for the Solid concepts that aren't access-control or WebID-shaped:
[LDP containers](https://www.w3.org/TR/ldp/#ldpc) and the contained resources
they describe, plus the vCard-shaped `Email` and `Telephone` value objects
used inside profiles.

Exported from `@solid/object/solid` (and re-exported from `@solid/object`).

```ts
import {
  Container,
  ContainerDataset,
  Email,
  EmailDataset,
  Resource,
  Telephone,
  TelephoneDataset,
} from "@solid/object/solid"
```

## `Resource`

Wraps a single resource term — typically the subject of an
[`ldp:contains`](https://www.w3.org/TR/ldp/#dfn-containment-triples) triple
inside a container's representation.

`extends TermWrapper`.

### Construction

```ts
new Resource(term, dataset, factory)
```

### Properties

| Property | Type | Source | Notes |
| --- | --- | --- | --- |
| `id` | `string` | The wrapped term's `value` (its IRI). | Read-only. |
| `isContainer` | `boolean` | `id` ends with `/`. | Per the [Solid Protocol](https://solidproject.org/TR/protocol#resources) convention that container URLs end in a slash. |
| `fileType` | `"folder" \| "file" \| "image" \| "document" \| "other"` | Derived from `isContainer`. | Currently always returns `"folder"` or `"file"`; the wider union is reserved for future heuristics. |
| `title` | `string \| undefined` | [`dc:title`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#http://purl.org/dc/terms/title) | |
| `label` | `string \| undefined` | [`rdfs:label`](https://www.w3.org/TR/rdf-schema/#ch_label) | |
| `name` | `string` | Computed: `title` -> `label` -> last URL path segment (URL-decoded where possible). | Always defined. |
| `modified` | `Date \| undefined` | [`dc:modified`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#http://purl.org/dc/terms/modified) | |
| `mtime` | `Date \| undefined` | [`posix:mtime`](http://www.w3.org/ns/posix/stat#mtime) | |
| `lastModified` | `Date \| undefined` | Computed: `modified` -> `mtime`. | |
| `size` | `number \| undefined` | [`posix:size`](http://www.w3.org/ns/posix/stat#size) | |
| `type` | `Set<string>` | `rdf:type` | Mutable set. |
| `mimeType` | `string \| undefined` | First member of `type` matching `http://www.w3.org/ns/iana/media-types/.../#Resource`. | The full IANA-vocabulary class IRI is returned, not the bare media-type string — extract the media type yourself if you need `image/png` rather than `http://www.w3.org/ns/iana/media-types/image/png#Resource`. |

`toString()` returns `id`.

## `Container`

A `Resource` that exposes its [LDP contained resources](https://www.w3.org/TR/ldp/#dfn-containment-triples).

`extends Resource`.

| Property | Type | Predicate |
| --- | --- | --- |
| `contains` | `Set<`[`Resource`](#resource)`>` | [`ldp:contains`](https://www.w3.org/TR/ldp/#dfn-containment-triples) |

## `ContainerDataset`

`extends DatasetWrapper`.

| Property | Type | Description |
| --- | --- | --- |
| `container` | [`Container`](#container) \| `undefined` | The first subject in the dataset that has an `ldp:contains` triple, wrapped as a `Container`. |

### Example

```ts
import { DataFactory, Parser, Store } from "n3"
import { ContainerDataset } from "@solid/object/solid"

const store = new Store()
store.addQuads(new Parser().parse(`
  @prefix ldp:   <http://www.w3.org/ns/ldp#> .
  @prefix posix: <http://www.w3.org/ns/posix/stat#> .

  <https://example/photos/>
    ldp:contains <https://example/photos/cat.jpg> ,
                 <https://example/photos/2026/> .

  <https://example/photos/cat.jpg>
    posix:size 12345 .
`))

const container = new ContainerDataset(store, DataFactory).container
for (const child of container?.contains ?? []) {
  console.log(child.name, child.fileType, child.size)
}
```

## `Email`

Wraps a vCard `Email` value object — the subject of `vcard:hasEmail` /
`vcard:email`. The vCard ontology models email addresses as their own
resources so that they can carry a type (Home, Work, ...).

`extends TermWrapper`.

### Properties

| Property | Type | Predicate | Notes |
| --- | --- | --- | --- |
| `emailAddress` | `string` (read/write) | [`vcard:value`](https://www.w3.org/TR/vcard-rdf/#value) | Throws if absent on read. |
| `emailType` | `string \| undefined` (read/write) | `rdf:type` | Typically `vcard:Home`, `vcard:Work`, etc. |

## `EmailDataset`

`extends DatasetWrapper`.

| Property | Type | Description |
| --- | --- | --- |
| `emails` | `Iterable<`[`Email`](#email)`>` | Every subject typed `vcard:Email`, plus every object of `vcard:hasEmail` and `vcard:email`. |

### Example

```ts
import { DataFactory, Parser, Store } from "n3"
import { EmailDataset } from "@solid/object/solid"

const store = new Store()
store.addQuads(new Parser().parse(`
  @prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
  <https://id.example/alice#me>
    vcard:hasEmail <https://id.example/alice#email-work> .
  <https://id.example/alice#email-work>
    a vcard:Email, vcard:Work ;
    vcard:value "alice@example.org" .
`))

for (const email of new EmailDataset(store, DataFactory).emails) {
  console.log(email.emailAddress, email.emailType)
}
```

## `Telephone`

Wraps a vCard `Tel` value object — the subject of `vcard:hasTelephone` /
`vcard:tel`.

`extends TermWrapper`.

| Property | Type | Predicate |
| --- | --- | --- |
| `phoneNumber` | `string` (read/write) | [`vcard:hasValue`](https://www.w3.org/TR/vcard-rdf/#hasValue) — throws if absent on read. |
| `phoneType` | `string \| undefined` (read/write) | `vcard:TelephoneType` ([known mismatch](#known-issues): the IRI used by the wrapper is a vCard *class*, not a predicate; the corresponding `Email.emailType` getter uses `rdf:type`). |

### Known issues

- `Telephone.phoneType` reads and writes triples whose predicate IRI is
  `http://www.w3.org/2006/vcard/ns#TelephoneType`, but in the
  [vCard ontology](https://www.w3.org/TR/vcard-rdf/) `vcard:TelephoneType`
  is a class, not a predicate. The canonical predicate is `rdf:type`
  (which is what `Email.emailType` uses). Treat `phoneType` as a
  `@solid/object`-internal convention until the upstream fixes the
  predicate.

## `TelephoneDataset`

`extends DatasetWrapper`.

| Property | Type | Description |
| --- | --- | --- |
| `telephones` | `Iterable<`[`Telephone`](#telephone)`>` | Every object of `vcard:hasTelephone` and `vcard:tel`. |
