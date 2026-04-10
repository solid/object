import { NamedNodeAs, NamedNodeFrom, SetFrom } from "@rdfjs/wrapper"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class Matcher extends Typed {
    get agent(): Set<string> {
        return SetFrom.subjectPredicate(this, ACP.agent, NamedNodeAs.string, NamedNodeFrom.string)
    }
}
