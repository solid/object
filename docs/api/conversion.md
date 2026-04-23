# WAC <-> ACP conversion

Best-effort, lossy translators between the legacy
[Web Access Control](https://solidproject.org/TR/wac) representation and the
newer [Access Control Policy](https://solid.github.io/authorization-panel/acp-specification/)
representation.

Each conversion writes triples into a caller-supplied `DatasetCore` and
throws a `TranslationError` (subclass) when the source uses a feature with
no equivalent on the target side.

Exported from `@solid/object`:

```ts
import {
  acpToWac,
  AcpToWacError,
  TranslationError,
  wacToAcp,
  WacToAcpError,
} from "@solid/object"
```

## `wacToAcp(source, target)`

```ts
function wacToAcp(source: AclResource, target: DatasetCore): void
```

Translates every authorisation in `source` into an ACP graph written to
`target`.

For each `Authorization`:

- `acl:accessTo` becomes an `acp:AccessControlResource` with an
  `acp:accessControl` chain.
- `acl:default` becomes an `acp:AccessControlResource` with an
  `acp:memberAccessControl` chain.
- Each `acl:mode` is added to the resulting `acp:Policy`'s `acp:allow`.
- Each `acl:agent`, expanded `acl:agentGroup` member, and the
  `foaf:Agent` / `acl:AuthenticatedAgent` agent classes is added to a
  single `acp:allOf` `acp:Matcher`. `foaf:Agent` maps to
  `acp:PublicAgent`; `acl:AuthenticatedAgent` maps to `acp:AuthenticatedAgent`.

Throws [`WacToAcpError`](#wactoacperror) when the authorisation includes:

- `acl:origin` (no equivalent in ACP).

## `acpToWac(source, target)`

```ts
function acpToWac(source: AcrDataset, target: DatasetCore): void
```

Translates the first `AccessControlResource` in `source` into one
`acl:Authorization` written to `target`. Iterates each policy under each
access-control bundle and copies allow modes plus matched agents.

Throws [`AcpToWacError`](#acptowacerror) when the source uses any of the
following ACP features (none have a faithful WAC equivalent):

- `acp:deny`
- `acp:anyOf`
- `acp:noneOf`
- `acp:client` matcher
- `acp:issuer` matcher
- `acp:vc` matcher
- `acp:agent` IRI of `acp:CreatorAgent` or `acp:OwnerAgent`

`acp:PublicAgent` is rewritten to `foaf:Agent`, and
`acp:AuthenticatedAgent` to `acl:AuthenticatedAgent`.

## `TranslationError`

Base class. Message format: `<sourcePrefix>:<property> cannot be translated to <target>`.

```ts
class TranslationError extends Error {
  constructor(prefix: string, property: string, target: string, cause?: any)
}
```

## `WacToAcpError`

```ts
class WacToAcpError extends TranslationError
```

Constructed with the offending WAC predicate (e.g. `"origin"`); message reads
`acl:origin cannot be translated to ACP`.

## `AcpToWacError`

```ts
class AcpToWacError extends TranslationError
```

Constructed with the offending ACP predicate or agent class (e.g.
`"deny"`, `"anyOf"`, `"CreatorAgent"`).

## Example: convert a WAC `.acl` to an ACR

```ts
import { DataFactory, Parser, Store } from "n3"
import { AclResource, wacToAcp, WacToAcpError } from "@solid/object"

const wac = new Store()
wac.addQuads(new Parser().parse(`
  @prefix acl: <http://www.w3.org/ns/auth/acl#> .
  []  a acl:Authorization ;
      acl:accessTo <https://example/data> ;
      acl:default  <https://example/data> ;
      acl:agent    <https://id.example/alice#me> ;
      acl:mode     acl:Read, acl:Write .
`))

const acr = new Store()
try {
  wacToAcp(new AclResource(wac, DataFactory), acr)
} catch (error) {
  if (error instanceof WacToAcpError) {
    console.error("Cannot translate:", error.message)
  } else throw error
}
```
