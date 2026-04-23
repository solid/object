# `@solid/object` documentation

Per-export API reference for `@solid/object`. Start with the main
[README](../README.md) for installation and the high-level overview.

## API reference

- [WebID — `Agent`, `WebIdDataset`](api/webid.md)
- [Access Control Policy — `AccessControl`, `AccessControlResource`, `AcrDataset`, `Matcher`, `Policy`](api/acp.md)
- [Web Access Control — `AclResource`, `Authorization`, `Group`](api/wac.md)
- [Solid resources — `Resource`, `Container`, `ContainerDataset`, `Email`, `EmailDataset`, `Telephone`, `TelephoneDataset`](api/solid.md)
- [WAC <-> ACP conversion — `acpToWac`, `wacToAcp`, error types](api/conversion.md)
- [Vocabulary constants — `ACL`, `ACP`, `DC`, `FOAF`, `ICAL`, `LDP`, `PIM`, `POSIX`, `RDF`, `RDFS`, `SOLID`, `VCARD`](api/vocabulary.md)

## Conventions

- Term wrappers (`Agent`, `Resource`, `Authorization`, ACP wrappers, value
  objects) `extend TermWrapper` from
  [`@rdfjs/wrapper`](https://github.com/rdfjs/wrapper) — construct them with
  `(term, dataset, factory)`.
- Dataset wrappers (`WebIdDataset`, `AclResource`, `AcrDataset`,
  `ContainerDataset`, `EmailDataset`, `TelephoneDataset`) `extend
  DatasetWrapper` — construct them with `(dataset, factory)`.
- Properties typed `Set<T>` are live: adding to or removing from the
  returned set mutates the underlying dataset.
- Properties typed `T | undefined` map to a single triple — the setter
  (where present) overwrites, and assigning `undefined` deletes the triple.
