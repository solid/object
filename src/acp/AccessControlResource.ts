import { NamedNodeAs, NamedNodeFrom, OptionalAs, OptionalFrom, SetFrom, TermAs, TermFrom } from "@rdfjs/wrapper"
import { AccessControl } from "./AccessControl.js"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class AccessControlResource extends Typed {
    get accessControl(): Set<AccessControl> {
        return SetFrom.subjectPredicate(this, ACP.accessControl, TermAs.instance(AccessControl), TermFrom.instance)
    }

    get memberAccessControl(): Set<AccessControl> {
        return SetFrom.subjectPredicate(this, ACP.memberAccessControl, TermAs.instance(AccessControl), TermFrom.instance)
    }

    get resource(): string | undefined {
        return OptionalFrom.subjectPredicate(this, ACP.resource, NamedNodeAs.string)
    }

    set resource(v: string | undefined) {
        OptionalAs.object(this, ACP.resource, v, NamedNodeFrom.string)
    }
}
