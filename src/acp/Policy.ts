import { NamedNodeAs, NamedNodeFrom, SetFrom, TermAs, TermFrom } from "@rdfjs/wrapper"
import { Matcher } from "./Matcher.js"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class Policy extends Typed {
    get allow(): Set<string> {
        return SetFrom.subjectPredicate(this, ACP.allow, NamedNodeAs.string, NamedNodeFrom.string)
    }

    get anyOf(): Set<Matcher> {
        return SetFrom.subjectPredicate(this, ACP.anyOf, TermAs.instance(Matcher), TermFrom.instance)
    }

    get allOf(): Set<Matcher> {
        return SetFrom.subjectPredicate(this, ACP.allOf, TermAs.instance(Matcher), TermFrom.instance)
    }
}
