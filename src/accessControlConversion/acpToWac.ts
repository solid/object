import { AccessControl, AccessControlResource, AcrDataset } from "../acp/mod.js"
import type { DatasetCore } from "@rdfjs/types"
import { Authorization } from "../wac/mod.js"
import { ACL, ACP, FOAF } from "../vocabulary/mod.js"
import { AcpToWacError } from "./AcpToWacError.js"

export function acpToWac(source: AcrDataset, target: DatasetCore) {
    if (source.acr === undefined) {
        return
    }

    const auth = new Authorization(source.acr.factory.blankNode(), target, source.acr.factory)
    auth.type.add(ACL.Authorization)

    processAcr(source.acr, auth)
}

function processAcr(source: AccessControlResource, target: Authorization) {
    if (source.accessControl.size > 0) {
        target.accessTo = source.resource
    }

    if (source.memberAccessControl.size > 0) {
        target.default = source.resource
    }

    for (const ac of source.accessControl) {
        processAc(ac, target)
    }

    for (const ac of source.memberAccessControl) {
        processAc(ac, target)
    }
}

function processAc(source: AccessControl, target: Authorization) {
    for (const policy of source.apply) {
        if (policy.deny.size > 0) {
            throw new AcpToWacError("deny")
        }

        if (policy.anyOf.size > 0) {
            throw new AcpToWacError("anyOf")
        }

        if (policy.noneOf.size > 0) {
            throw new AcpToWacError("noneOf")
        }

        for (const mode of policy.allow) {
            target.mode.add(mode)
        }

        for (const matcher of policy.allOf) {
            if (matcher.client.size > 0) {
                throw new AcpToWacError("client")
            }

            if (matcher.issuer.size > 0) {
                throw new AcpToWacError("issuer")
            }

            if (matcher.vc.size > 0) {
                throw new AcpToWacError("vc")
            }

            for (const agent of matcher.agent) {
                if (agent === ACP.CreatorAgent) {
                    throw new AcpToWacError("CreatorAgent")
                }

                if (agent === ACP.OwnerAgent) {
                    throw new AcpToWacError("OwnerAgent")
                }

                if (agent === ACP.PublicAgent) {
                    target.agent.add(FOAF.Agent)
                } else if (agent === ACP.AuthenticatedAgent) {
                    target.agent.add(ACL.AuthenticatedAgent)
                } else {
                    target.agent.add(agent)
                }
            }
        }
    }
}
