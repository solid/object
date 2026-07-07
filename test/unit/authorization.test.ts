import { DataFactory, Parser, Store } from "n3"
import assert from "node:assert"
import { describe, it } from "node:test"

import { Authorization } from "@solid/object"

describe("Authorization.conforms", () => {
    const sampleRDF = `
@prefix acl:  <http://www.w3.org/ns/auth/acl#> .

<https://pod.example/.acl#accessToOnly>
    a acl:Authorization ;
    acl:accessTo <https://pod.example/note> ;
    acl:mode acl:Read ;
    acl:agent <https://alice.example/profile/card#me> .

<https://pod.example/.acl#defaultOnly>
    a acl:Authorization ;
    acl:default <https://pod.example/container/> ;
    acl:mode acl:Read ;
    acl:agent <https://alice.example/profile/card#me> .

<https://pod.example/.acl#neither>
    a acl:Authorization ;
    acl:mode acl:Read ;
    acl:agent <https://alice.example/profile/card#me> .
`

    const store = new Store()
    store.addQuads(new Parser().parse(sampleRDF))

    const authorization = (fragment: string) =>
        new Authorization(
            DataFactory.namedNode("https://pod.example/.acl#" + fragment),
            store,
            DataFactory
        )

    it("conforms when only acl:accessTo is present", () => {
        assert.strictEqual(authorization("accessToOnly").conforms, true)
    })

    it("conforms when only acl:default is present", () => {
        assert.strictEqual(authorization("defaultOnly").conforms, true)
    })

    it("does not conform when neither acl:accessTo nor acl:default is present", () => {
        assert.strictEqual(authorization("neither").conforms, false)
    })
})
