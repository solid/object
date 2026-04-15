import {
    AccessControl,
    AccessControlResource,
    AclResource,
    AcrDataset,
    Authorization,
    Matcher,
    Policy
} from "@solid/object"
import type { DatasetCore } from "@rdfjs/types"
import { suite, test } from "node:test"
import { DataFactory, Parser, Store, Writer } from "n3"

//#region WAC -> ACP

const wacRdf = `
BASE <http://example.com/>
PREFIX : <http://www.w3.org/ns/auth/acl#>

<ControlReadWrite>
    a :Authorization ;
    :accessTo <resource> ;
    :agent <someone> ;
    :mode :Control, :Read, :Write ;
.

<ControlReadWriteDefault>
    a :Authorization ;
    :default <resource> ;
    :agent <someone> ;
    :mode :Control, :Read, :Write ;
.

<ReadDefault>
    a :Authorization ;
    :default <resource> ;
    :agent <someoneElse> ;
    :mode :Read ;
    # :origin <http://bot>, <http://example.com>, <http://webid> ;
.
`;

async function wacToAcp() {
    const wac = new AclResource(read(wacRdf), DataFactory)
    const result = new Store()

    for (const auth of wac.authorizations) {
        processAuthorization(auth, result)
    }

    console.log("--------------------------")
    console.log("WAC -> ACP")
    console.log(await write(result))
    console.log("--------------------------")
}

function processAuthorization(auth: Authorization, result: DatasetCore) {
    if (auth.origin.size > 0) {
        throw new Error("WAC origin cannot be translated to ACP")
    }

    if (auth.accessTo !== undefined) {
        const acr = new AccessControlResource(auth.factory.blankNode(), result, auth.factory)
        populatePolicy(acr, auth, auth.accessTo, acr.accessControl)
    }

    if (auth.default !== undefined) {
        const acr = new AccessControlResource(auth.factory.blankNode(), result, auth.factory)
        populatePolicy(acr, auth, auth.default, acr.memberAccessControl)
    }
}

function populatePolicy(acr: AccessControlResource, auth: Authorization, resource: string, accessControls: Set<AccessControl>) {
    const accessControl = new AccessControl(acr.factory.blankNode(), acr.dataset, acr.factory)
    const policy = new Policy(acr.factory.blankNode(), acr.dataset, acr.factory)
    const matcher = new Matcher(acr.factory.blankNode(), acr.dataset, acr.factory)

    accessControls.add(accessControl)
    accessControl.apply.add(policy)
    policy.allOf.add(matcher)

    acr.resource = resource

    for (const mode of auth.mode) {
        policy.allow.add(mode)
    }

    for (const agent of auth.agent) {
        matcher.agent.add(agent)
    }

    if (auth.agentGroup !== undefined) {
        for (const member of auth.agentGroup.hasMember) {
            matcher.agent.add(member)
        }
    }

    if (auth.agentClass.has(ACL.AuthenticatedAgent)) {
        matcher.agent.add(ACP.AuthenticatedAgent)
    }

    if (auth.agentClass.has(FOAF.Agent)) {
        matcher.agent.add(ACP.PublicAgent)
    }
}

//#endregion

//#region ACP -> WAC

const acpRdf = `
`;

function acpToWac() {
    const acp = new AcrDataset(read(acpRdf), DataFactory)

    if (acp.acr != undefined) {
        processAcr(acp.acr)
    }
}

function processAcr(acr: AccessControlResource) {

}

//#endregion

//#region Utilities

//#region Namespaces

const ACL = {
    AuthenticatedAgent: "http://www.w3.org/ns/auth/acl#AuthenticatedAgent",
} as const

const ACP = {
    AuthenticatedAgent: "http://www.w3.org/ns/solid/acp#AuthenticatedAgent",
    PublicAgent: "http://www.w3.org/ns/solid/acp#PublicAgent",
} as const

const FOAF = {
    Agent: "http://xmlns.com/foaf/0.1/Agent",
} as const

//#endregion

await suite("Convert access control representation", async () => {
    await test("From WAC to ACP", wacToAcp)
    await test("From ACP to WAC", acpToWac)
})

function read(rdf: string): DatasetCore {
    const dataset = new Store()
    dataset.addQuads(new Parser().parse(rdf))

    return dataset
}

export function write(dataset: DatasetCore): Promise<string> {
    return new Promise((resolve, reject) => {
        const writer = new Writer({
            prefixes: {
                "": "http://example.com/",
                acl: "http://www.w3.org/ns/auth/acl#",
                acp: "http://www.w3.org/ns/solid/acp#",
            }
        })

        writer.addQuads([...dataset])

        writer.end((error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

//#endregion
