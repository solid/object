import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"

import { Telephone } from "@solid/object";

describe("Telephone tests", () => {

    const sampleRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .

<https://example.org/person/1>
    a vcard:Individual ;
    vcard:fn "Alice" ;
    vcard:hasTelephone <https://example.org/phone/1> .

<https://example.org/phone/1>
    a vcard:Telephone ;
    vcard:hasValue "+1234567890" ;
    vcard:TelephoneType vcard:Cell .
`;

    it("should parse and retrieve phone number", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const telephone = new Telephone(
            DataFactory.namedNode("https://example.org/phone/1"),
            store,
            DataFactory
        )

        assert.equal(telephone.phoneNumber, "+1234567890")
        assert.equal(typeof telephone.phoneNumber, "string")
    })

    it("should allow setting phone number", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const telephone = new Telephone(
            DataFactory.namedNode("https://example.org/phone/1"),
            store,
            DataFactory
        )

        telephone.phoneNumber = "+0987654321"

        assert.equal(telephone.phoneNumber, "+0987654321")
    })

    it("should parse and retrieve phone type", () => {
        const store = new Store()
        store.addQuads(new Parser().parse(sampleRDF))

        const telephone = new Telephone(
            DataFactory.namedNode("https://example.org/phone/1"),
            store,
            DataFactory
        )

        const phoneType = telephone.phoneType

        assert.ok(phoneType !== undefined)
        assert.equal(typeof phoneType, "string")
        assert.equal(phoneType, "http://www.w3.org/2006/vcard/ns#Cell")
    })

    it("should allow setting phone type", () => {
        const store = new Store()

        const telephone = new Telephone(
            DataFactory.namedNode("https://example.org/phone/2"),
            store,
            DataFactory
        )

        telephone.phoneNumber = "+1112223333"
        telephone.phoneType = "http://www.w3.org/2006/vcard/ns#Car"

        assert.equal(telephone.phoneType, "http://www.w3.org/2006/vcard/ns#Car")
    })

    it("should throw when phone number is missing", () => {
        const noPhoneRDF = `
@prefix vcard: <http://www.w3.org/2006/vcard/ns#> .

<https://example.org/phone/empty>
    a vcard:Telephone .
`
        const store = new Store()
        store.addQuads(new Parser().parse(noPhoneRDF))

        const telephone = new Telephone(
            DataFactory.namedNode("https://example.org/phone/empty"),
            store,
            DataFactory
        )

        assert.throws(() => {
            telephone.phoneNumber
        })
    })

})
