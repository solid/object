import { SetFrom, TermAs, TermFrom } from "@rdfjs/wrapper"
import { Policy } from "./Policy.js"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class AccessControl extends Typed {
    get apply(): Set<Policy> {
        return SetFrom.subjectPredicate(this, ACP.apply, TermAs.instance(Policy), TermFrom.instance)
    }
}
