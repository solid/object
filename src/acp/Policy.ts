import { NamedNodeAs, NamedNodeFrom, TermAs, TermFrom } from "@rdfjs/wrapper"
import { Matcher } from "./Matcher.js"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class Policy extends Typed {
    get allow(): Set<string> {
        return this.objects(ACP.allow, NamedNodeAs.string, NamedNodeFrom.string)
    }

    get anyOf(): Set<Matcher> {
        return this.objects(ACP.anyOf, TermAs.instance(Matcher), TermFrom.instance)
    }
}
