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

    for (const auth of wac.authorizations) processAuthorization(auth, result)

    await log("WAC -> ACP", result)
}

function processAuthorization(auth: Authorization, result: DatasetCore) {
    if (any(auth.origin)) throw new Wac2AcpError("origin")

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

    for (const mode of auth.mode) policy.allow.add(mode)

    for (const agent of auth.agent) {
        if (agent === FOAF.Agent) matcher.agent.add(ACP.PublicAgent)
        else if (agent === ACL.AuthenticatedAgent) matcher.agent.add(ACP.AuthenticatedAgent)
        else matcher.agent.add(agent)
    }

    for (const member of auth.agentGroup?.hasMember ?? []) matcher.agent.add(member)
}

//#endregion

//#region ACP -> WAC

const acpRdf = `
`;

async function acpToWac() {
    const acp = new AcrDataset(read(acpRdf), DataFactory)
    const result = new Store()

    if (acp.acr != undefined) processAcr(acp.acr, result)

    await log("ACP -> WAC", result)
}

function processAcr(acr: AccessControlResource, result: DatasetCore) {
    const auth = new Authorization(acr.factory.blankNode(), result, acr.factory)

    if (any(acr.accessControl)) auth.accessTo = acr.resource
    if (any(acr.memberAccessControl)) auth.default = acr.resource

    for (const ac of acr.accessControl) processAc(ac, auth)
    for (const ac of acr.memberAccessControl) processAc(ac, auth)
}

function processAc(ac: AccessControl, auth: Authorization) {
    for (const policy of ac.apply) {
        if (any(policy.deny)) throw new Acp2WacError("deny")
        if (any(policy.anyOf)) throw new Acp2WacError("anyOf")
        if (any(policy.noneOf)) throw new Acp2WacError("noneOf")

        for (const mode of policy.allow) auth.mode.add(mode)

        for (const matcher of policy.allOf) {
            if (any(matcher.client)) throw new Acp2WacError("client")
            if (any(matcher.issuer)) throw new Acp2WacError("issuer")
            if (any(matcher.vc)) throw new Acp2WacError("vc")

            for (const agent of matcher.agent) {
                if (agent === ACP.CreatorAgent) throw new Acp2WacError("CreatorAgent")
                if (agent === ACP.OwnerAgent) throw new Acp2WacError("OwnerAgent")

                if (agent === ACP.PublicAgent) auth.agent.add(FOAF.Agent)
                else if (agent === ACP.AuthenticatedAgent) auth.agent.add(ACL.AuthenticatedAgent)
                else auth.agent.add(agent)
            }
        }
    }
}

//#endregion

//#region Utilities

//#region Namespaces

const ACL = {
    AuthenticatedAgent: "http://www.w3.org/ns/auth/acl#AuthenticatedAgent",
} as const

const ACP = {
    AuthenticatedAgent: "http://www.w3.org/ns/solid/acp#AuthenticatedAgent",
    CreatorAgent: "http://www.w3.org/ns/solid/acp#CreatorAgent",
    OwnerAgent: "http://www.w3.org/ns/solid/acp#OwnerAgent",
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

function write(dataset: DatasetCore): Promise<string> {
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

function any<T>(set: Set<T>) {
    return set.size > 0
}

async function log(title: string, dataset: DatasetCore) {
    console.log("--------------------------")
    console.log(title)
    console.log(await write(dataset))
    console.log("--------------------------")
}

//#region Errors

class TranslationError extends Error {
    constructor(prefix: string, property: string, target: string, cause?: any) {
        super(`${prefix}:${property} cannot be translated to ${target}`)
        this.name = this.constructor.name
        this.cause = cause
    }
}

class Acp2WacError extends TranslationError {
    constructor(property: string, cause?: any) {
        super("acp", property, "WAC", cause)
    }
}

class Wac2AcpError extends TranslationError {
    constructor(property: string, cause?: any) {
        super("acl", property, "ACP", cause)
    }
}

//#endregion

//#endregion
