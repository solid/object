import { NamedNodeAs, NamedNodeFrom, TermAs, TermFrom } from "@rdfjs/wrapper"
import { AccessControl } from "./AccessControl.js"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class AccessControlResource extends Typed {
    get accessControl(): Set<AccessControl> {
        return this.objects(ACP.accessControl, TermAs.instance(AccessControl), TermFrom.instance)
    }

    get resource(): string | undefined {
        return this.singularNullable(ACP.resource, NamedNodeAs.string)
    }

    set resource(v: string) {
        this.overwriteNullable(ACP.resource, v, NamedNodeFrom.string)
    }
}
