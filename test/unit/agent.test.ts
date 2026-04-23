import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"

import { Agent } from "@solid/object"

describe("Agent oidcIssuers", () => {

    const sampleRDF = `
@prefix solid: <http://www.w3.org/ns/solid/terms#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

<https://example.org/profile/card#me>
    a foaf:Person ;
    solid:oidcIssuer <https://idp.example.org/> , <https://idp.other.example/> .
`;

    it("returns the set of solid:oidcIssuer values declared on the WebID", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const agent = new Agent(
            DataFactory.namedNode("https://example.org/profile/card#me"),
            store,
            DataFactory
        )

        assert.deepStrictEqual(
            new Set(agent.oidcIssuers),
            new Set(["https://idp.example.org/", "https://idp.other.example/"])
        )
    })
})
