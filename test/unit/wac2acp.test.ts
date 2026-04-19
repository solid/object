import { AclResource, acpToWac, AcpToWacError, AcrDataset, wacToAcp, WacToAcpError } from "@solid/object"
import type { DatasetCore } from "@rdfjs/types"
import { suite, test } from "node:test"
import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert";
import { isomorphic } from "rdf-isomorphic"

await suite("Convert access control representation", async () => {
    await suite("from WAC to ACP", async () => {
        await test("successfully", async function () {
            const sourceRdf = `
BASE <http://example.com/>
PREFIX : <http://www.w3.org/ns/auth/acl#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

[
    a :Authorization ;
    :accessTo <resource1> ;
    :default <resource2> ;
    :agent <agent1>, :AuthenticatedAgent, foaf:Agent ;
    :mode :Read, :Write ;
] .
`;
            const expectedRdf = `
BASE <http://example.com/>
PREFIX : <http://www.w3.org/ns/solid/acp#>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>

[
    :resource <resource1> ;
    :accessControl [
        :apply [
            :allow acl:Read, acl:Write ;
            :allOf [
                :agent <agent1>, :AuthenticatedAgent, :PublicAgent ;
            ] ;
        ] ;
    ] ;
] .

[
    :resource <resource2> ;
    :memberAccessControl [
        :apply [
            :allow acl:Read, acl:Write ;
            :allOf [
                :agent <agent1>, :AuthenticatedAgent, :PublicAgent ;
            ] ;
        ] ;
    ] ;
] .
`
            const expected = read(expectedRdf)
            const source = new AclResource(read(sourceRdf), DataFactory)
            const target = new Store()

            wacToAcp(source, target)

            assert.ok(isomorphic([...target], [...expected]))
        })

        await test("unsuccessfully: origin", async function () {
            const sourceRdf = `
BASE <http://example.com/>
PREFIX : <http://www.w3.org/ns/auth/acl#>

[
    a :Authorization ;
    :origin <resource> ;
] .
`;

            assert.throws(() => wacToAcp(new AclResource(read(sourceRdf), DataFactory), new Store), WacToAcpError)
        })
    })

    await suite("from ACP to WAC", async () => {
        await test("successfully", async function () {
            const sourceRdf = `
BASE <http://example.com/>
PREFIX : <http://www.w3.org/ns/solid/acp#>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>

[
    :resource <resource1> ;
    :accessControl [
        :apply [
            :allow acl:Read, acl:Write ;
            :allOf [
                :agent <agent1>, :AuthenticatedAgent, :PublicAgent ;
            ] ;
        ] ;
    ] ;
    :memberAccessControl [
        :apply [
            :allow acl:Read, acl:Write ;
            :allOf [
                :agent <agent1>, :AuthenticatedAgent, :PublicAgent ;
            ] ;
        ] ;
    ] ;
] .
`
            const expectedRdf = `
BASE <http://example.com/>
PREFIX : <http://www.w3.org/ns/auth/acl#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

[
    a :Authorization ;
    :accessTo <resource1> ;
    :default <resource1> ;
    :agent <agent1>, :AuthenticatedAgent, foaf:Agent ;
    :mode :Read, :Write ;
] .
`;
            const expected = read(expectedRdf)
            const source = new AcrDataset(read(sourceRdf), DataFactory)
            const target = new Store()

            acpToWac(source, target)

            assert.ok(isomorphic([...target], [...expected]))
        })

        await test("unsuccessfully: deny", async function () {
            const sourceRdf = `
PREFIX : <http://www.w3.org/ns/solid/acp#>

[
    :accessControl [
        :apply [
            :deny [] ;
        ] ;
    ] ;
] .
`
            assert.throws(() => acpToWac(new AcrDataset(read(sourceRdf), DataFactory), new Store()), AcpToWacError)
        })

        await test("unsuccessfully: anyOf", async function () {
            const sourceRdf = `
PREFIX : <http://www.w3.org/ns/solid/acp#>

[
    :accessControl [
        :apply [
            :anyOf [] ;
        ] ;
    ] ;
] .
`
            assert.throws(() => acpToWac(new AcrDataset(read(sourceRdf), DataFactory), new Store()), AcpToWacError)
        })

        await test("unsuccessfully: noneOf", async function () {
            const sourceRdf = `
PREFIX : <http://www.w3.org/ns/solid/acp#>

[
    :accessControl [
        :apply [
            :noneOf [] ;
        ] ;
    ] ;
] .
`
            assert.throws(() => acpToWac(new AcrDataset(read(sourceRdf), DataFactory), new Store()), AcpToWacError)
        })

        await test("unsuccessfully: client", async function () {
            const sourceRdf = `
PREFIX : <http://www.w3.org/ns/solid/acp#>

[
    :accessControl [
        :apply [
            :allOf [
                :client [] ;
            ] ;
        ] ;
    ] ;
] .
`
            assert.throws(() => acpToWac(new AcrDataset(read(sourceRdf), DataFactory), new Store()), AcpToWacError)
        })

        await test("unsuccessfully: issuer", async function () {
            const sourceRdf = `
PREFIX : <http://www.w3.org/ns/solid/acp#>

[
    :accessControl [
        :apply [
            :allOf [
                :issuer [] ;
            ] ;
        ] ;
    ] ;
] .
`
            assert.throws(() => acpToWac(new AcrDataset(read(sourceRdf), DataFactory), new Store()), AcpToWacError)
        })

        await test("unsuccessfully: vc", async function () {
            const sourceRdf = `
PREFIX : <http://www.w3.org/ns/solid/acp#>

[
    :accessControl [
        :apply [
            :allOf [
                :vc [] ;
            ] ;
        ] ;
    ] ;
] .
`
            assert.throws(() => acpToWac(new AcrDataset(read(sourceRdf), DataFactory), new Store()), AcpToWacError)
        })

        await test("unsuccessfully: CreatorAgent", async function () {
            const sourceRdf = `
PREFIX : <http://www.w3.org/ns/solid/acp#>

[
    :accessControl [
        :apply [
            :allOf [
                :agent :CreatorAgent ;
            ] ;
        ] ;
    ] ;
] .
`
            assert.throws(() => acpToWac(new AcrDataset(read(sourceRdf), DataFactory), new Store()), AcpToWacError)
        })

        await test("unsuccessfully: OwnerAgent", async function () {
            const sourceRdf = `
PREFIX : <http://www.w3.org/ns/solid/acp#>

[
    :accessControl [
        :apply [
            :allOf [
                :agent :OwnerAgent ;
            ] ;
        ] ;
    ] ;
] .
`
            assert.throws(() => acpToWac(new AcrDataset(read(sourceRdf), DataFactory), new Store()), AcpToWacError)
        })
    })
})

function read(rdf: string): DatasetCore {
    const dataset = new Store()
    dataset.addQuads(new Parser().parse(rdf))

    return dataset
}
