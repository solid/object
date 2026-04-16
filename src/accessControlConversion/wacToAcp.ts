import { AclResource, Authorization, } from "../wac/mod.js"
import { AccessControl, AccessControlResource, Matcher, Policy } from "../acp/mod.js"
import type { DatasetCore } from "@rdfjs/types"
import { WacToAcpError } from "./WacToAcpError.js"
import { ACL, ACP, FOAF } from "../vocabulary/mod.js"

export function wacToAcp(source: AclResource, target: DatasetCore) {
    for (const auth of source.authorizations) {
        processAuthorization(auth, target)
    }
}

function processAuthorization(source: Authorization, target: DatasetCore) {
    if (source.origin.size > 0) throw new WacToAcpError("origin")

    if (source.accessTo !== undefined) {
        const acr = new AccessControlResource(source.factory.blankNode(), target, source.factory)
        populatePolicy(acr, source, source.accessTo, acr.accessControl)
    }

    if (source.default !== undefined) {
        const acr = new AccessControlResource(source.factory.blankNode(), target, source.factory)
        populatePolicy(acr, source, source.default, acr.memberAccessControl)
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
        if (agent === FOAF.Agent) {
            matcher.agent.add(ACP.PublicAgent)
        } else if (agent === ACL.AuthenticatedAgent) {
            matcher.agent.add(ACP.AuthenticatedAgent)
        } else matcher.agent.add(agent)
    }

    for (const member of auth.agentGroup?.hasMember ?? []) {
        matcher.agent.add(member)
    }
}
