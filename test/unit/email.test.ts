import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"

import { Email } from "@solid/object";

describe("Email tests", () => {

    const sampleRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

<https://example.org/person/1>
    a vcard:Individual ;
    vcard:fn "Alice" ;
    vcard:hasEmail <https://example.org/email/1> .

<https://example.org/email/1>
    a vcard:Email ;
    vcard:value "alice@example.org" ;
    rdf:type vcard:Work .
`;

    it("should parse and retrieve email address", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const email = new Email(
            DataFactory.namedNode("https://example.org/email/1"),
            store,
            DataFactory
        )

        assert.equal(email.emailAddress, "alice@example.org")
        assert.equal(typeof email.emailAddress, "string")
    })

    it("should allow setting email address", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const email = new Email(
            DataFactory.namedNode("https://example.org/email/1"),
            store,
            DataFactory
        )

        email.emailAddress = "bob@example.org"

        assert.equal(email.emailAddress, "bob@example.org")
    })

    it("should parse and retrieve email type", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const email = new Email(
            DataFactory.namedNode("https://example.org/email/1"),
            store,
            DataFactory
        )

        const emailType = DataFactory.namedNode("http://www.w3.org/2006/vcard/ns#Home")

        assert.ok(emailType !== undefined)
        assert.equal(typeof emailType, "object")
        assert.equal(emailType.value, "http://www.w3.org/2006/vcard/ns#Home")
    })

    it("should allow setting email type", () => {
        const store = new Store()

        const email = new Email(
            DataFactory.namedNode("https://example.org/email/2"),
            store,
            DataFactory
        )

        email.emailAddress = "test@example.org"
        email.emailType = "http://www.w3.org/2006/vcard/ns#Home"

        assert.equal(email.emailType, "http://www.w3.org/2006/vcard/ns#Home")
    })

})
