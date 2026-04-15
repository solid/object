import { NamedNodeAs, NamedNodeFrom, SetFrom } from "@rdfjs/wrapper"
import { ACP } from "../vocabulary/mod.js"
import { Typed } from "./Typed.js";

export class Matcher extends Typed {
    get agent(): Set<string> {
        return SetFrom.subjectPredicate(this, ACP.agent, NamedNodeAs.string, NamedNodeFrom.string)
    }

    get client(): Set<string> {
        return SetFrom.subjectPredicate(this, ACP.client, NamedNodeAs.string, NamedNodeFrom.string)
    }

    get issuer(): Set<string> {
        return SetFrom.subjectPredicate(this, ACP.issuer, NamedNodeAs.string, NamedNodeFrom.string)
    }

    get vc(): Set<string> {
        return SetFrom.subjectPredicate(this, ACP.vc, NamedNodeAs.string, NamedNodeFrom.string)
    }
}
