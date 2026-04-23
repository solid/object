# Solid object

[![npm](https://img.shields.io/npm/v/@solid/object.svg)](https://www.npmjs.com/package/@solid/object)

RDF mapping classes for [Solid](https://solidproject.org/). Each class is a
thin, typed wrapper around an [RDF/JS](https://rdf.js.org/) dataset that
exposes the properties of a Solid concept (a WebID profile, an ACP policy, a
WAC authorisation, an LDP container, etc.) as ergonomic getters, setters and
sets.

The wrappers build on
[`@rdfjs/wrapper`](https://github.com/rdfjs/wrapper) — Solid object adds
the Solid-specific shapes and the vocabulary constants those shapes need.

## Install

```bash
npm install @solid/object
```

`@solid/object` is published as ESM and targets Node.js >= 24. It depends on
`@rdfjs/wrapper`; pair it with an RDF/JS-compliant `DataFactory` and
`DatasetCore` implementation. The examples below use [`n3`](https://github.com/rdfjs/N3.js).

## Quick start

Read the `name` and storage URLs from a WebID profile:

```ts
import { DataFactory, Parser, Store } from "n3"
import { WebIdDataset } from "@solid/object/webid"

const profile = `
<https://id.example/alice#me>
    a <http://xmlns.com/foaf/0.1/Agent> ;
    <http://xmlns.com/foaf/0.1/name> "Alice" ;
    <http://www.w3.org/ns/pim/space#storage> <https://storage.example/alice/> ;
    <http://www.w3.org/ns/solid/terms#oidcIssuer> <https://login.example/> .
`

const store = new Store()
store.addQuads(new Parser().parse(profile))

const dataset = new WebIdDataset(store, DataFactory)
const agent   = dataset.mainSubject

console.log(agent?.name)               // "Alice"
console.log([...agent?.storageUrls ?? []])
// ["https://storage.example/alice/"]
```

Read the authorisations out of an ACL resource:

```ts
import { DataFactory, Parser, Store } from "n3"
import { AclResource } from "@solid/object"

const acl = `
@prefix acl: <http://www.w3.org/ns/auth/acl#> .
[]  a acl:Authorization ;
    acl:accessTo <https://example/resource> ;
    acl:agent    <https://id.example/alice#me> ;
    acl:mode     acl:Read, acl:Write .
`

const store = new Store()
store.addQuads(new Parser().parse(acl))

const resource = new AclResource(store, DataFactory)
for (const auth of resource.authorizations) {
  console.log(auth.canRead, auth.canWrite, [...auth.agent])
}
```

Translate a WAC authorisation into an ACP policy graph (best effort — see
caveats on the [conversion docs](docs/api/conversion.md)):

```ts
import { DataFactory, Parser, Store } from "n3"
import { AclResource, wacToAcp } from "@solid/object"

const sourceStore = new Store()
sourceStore.addQuads(new Parser().parse(`
  @prefix acl: <http://www.w3.org/ns/auth/acl#> .
  []  a acl:Authorization ;
      acl:accessTo <https://example/data> ;
      acl:default  <https://example/data> ;
      acl:agent    <https://id.example/alice#me> ;
      acl:mode     acl:Read, acl:Write .
`))

const target = new Store()
wacToAcp(new AclResource(sourceStore, DataFactory), target)
```

## Package layout

The package ships four entry points:

| Import path | Re-exports |
| --- | --- |
| `@solid/object` | Everything below, plus the WAC wrappers and the WAC <-> ACP conversion functions. |
| `@solid/object/webid` | [`Agent`](docs/api/webid.md#agent) and [`WebIdDataset`](docs/api/webid.md#webiddataset). |
| `@solid/object/acp` | [`AccessControl`](docs/api/acp.md#accesscontrol), [`AccessControlResource`](docs/api/acp.md#accesscontrolresource), [`AcrDataset`](docs/api/acp.md#acrdataset), [`Matcher`](docs/api/acp.md#matcher), [`Policy`](docs/api/acp.md#policy). |
| `@solid/object/solid` | [`Container`](docs/api/solid.md#container), [`ContainerDataset`](docs/api/solid.md#containerdataset), [`Email`](docs/api/solid.md#email), [`EmailDataset`](docs/api/solid.md#emaildataset), [`Resource`](docs/api/solid.md#resource), [`Telephone`](docs/api/solid.md#telephone), [`TelephoneDataset`](docs/api/solid.md#telephonedataset). |

Use sub-path imports when only part of the surface is needed — bundlers will
tree-shake more aggressively and the cognitive surface stays small.

The root entry also exports the vocabulary constants
([`ACL`](docs/api/vocabulary.md#acl), [`ACP`](docs/api/vocabulary.md#acp),
[`DC`](docs/api/vocabulary.md#dc), [`FOAF`](docs/api/vocabulary.md#foaf),
[`ICAL`](docs/api/vocabulary.md#ical), [`LDP`](docs/api/vocabulary.md#ldp),
[`PIM`](docs/api/vocabulary.md#pim), [`POSIX`](docs/api/vocabulary.md#posix),
[`RDF`](docs/api/vocabulary.md#rdf), [`RDFS`](docs/api/vocabulary.md#rdfs),
[`SOLID`](docs/api/vocabulary.md#solid), [`VCARD`](docs/api/vocabulary.md#vcard))
as plain `string` IRIs grouped by namespace, and the WAC wrappers
([`AclResource`](docs/api/wac.md#aclresource),
[`Authorization`](docs/api/wac.md#authorization),
[`Group`](docs/api/wac.md#group)) plus the conversion helpers
([`acpToWac`](docs/api/conversion.md#acptowac),
[`wacToAcp`](docs/api/conversion.md#wactoacp) and their error types).

## API reference

Per-export documentation lives under [`docs/api/`](docs/api/):

- [WebID — `Agent`, `WebIdDataset`](docs/api/webid.md)
- [Access Control Policy — `AccessControl`, `AccessControlResource`, `AcrDataset`, `Matcher`, `Policy`](docs/api/acp.md)
- [Web Access Control — `AclResource`, `Authorization`, `Group`](docs/api/wac.md)
- [Solid resources — `Resource`, `Container`, `ContainerDataset`, `Email`, `EmailDataset`, `Telephone`, `TelephoneDataset`](docs/api/solid.md)
- [WAC <-> ACP conversion — `acpToWac`, `wacToAcp`, error types](docs/api/conversion.md)
- [Vocabulary constants](docs/api/vocabulary.md)

## Specifications

The wrappers map onto these specifications and vocabularies:

- [Solid Protocol](https://solidproject.org/TR/protocol)
- [Solid WebID Profile (Solid 2.6 working draft)](https://htmlpreview.github.io/?https://github.com/solid/specification/blob/feat/solid26-webid/solid26.html)
- [Solid OIDC](https://solid.github.io/solid-oidc/) — `solid:oidcIssuer`
- [Web Access Control (WAC)](https://solidproject.org/TR/wac)
- [Access Control Policy (ACP)](https://solid.github.io/authorization-panel/acp-specification/)
- [W3C Linked Data Platform (LDP)](https://www.w3.org/TR/ldp/) — `ldp:contains`
- [W3C vCard Ontology](https://www.w3.org/TR/vcard-rdf/)
- [Friend of a Friend (FOAF)](http://xmlns.com/foaf/spec/)
- [PIM/space](http://www.w3.org/ns/pim/space) — `pim:storage`
- [POSIX stat](http://www.w3.org/ns/posix/stat) — `posix:size`, `posix:mtime`
- [Dublin Core Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/)

## Contributing

Issues and pull requests are welcome at
[github.com/solid/object](https://github.com/solid/object).

```bash
git clone https://github.com/solid/object.git
cd object
npm install
npm test
```

Tests run the Node test runner against the compiled JavaScript output:
`tsc && tsc -p test && node --test "**/*.test.js"` (the `npm test` script).

The repository follows the editor settings in [`.editorconfig`](.editorconfig)
(four-space indent for code, two-space for Markdown). New wrappers should
keep getters and setters as thin as possible — push reasoning into
`@rdfjs/wrapper` helpers (`OptionalFrom`, `RequiredFrom`, `SetFrom`, `TermAs`,
etc.) rather than re-implementing traversal by hand.

## Documentation indexing

This repository ships a [`context7.json`](context7.json) so the
[Context7](https://context7.com) MCP server can index the documentation and
serve API lookups to coding agents that consume `@solid/object`.

## Licence

Dual-licensed under MIT and Apache 2.0 — pick whichever suits your project.

`SPDX-License-Identifier: MIT OR Apache-2.0`
