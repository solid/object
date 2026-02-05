import { ValueMappings, TermMappings, TermWrapper } from "rdfjs-wrapper"
import { AccessControl } from "./AccessControl.js"
import { ACP } from "../../vocabulary/acp.js"
import { Typed } from "../../util/Typed.js";

export class AccessControlResource extends Typed {
    get accessControl(): Set<AccessControl> {
        return this.objects(ACP.accessControl, TermWrapper.as(AccessControl), TermWrapper.as(AccessControl))
    }

    get resource(): string | undefined {
        return this.singularNullable(ACP.resource, ValueMappings.iriToString)
    }

    set resource(v: string) {
        this.overwriteNullable(ACP.resource, v, TermMappings.stringToIri)
    }
}
