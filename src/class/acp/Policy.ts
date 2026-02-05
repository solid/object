import { TermMappings, ValueMappings, TermWrapper } from "rdfjs-wrapper"
import { Matcher } from "./Matcher"
import { ACP } from "../../vocabulary/acp.js"
import { Typed } from "../../util/Typed.js";

export class Policy extends Typed {
    get allow(): Set<string> {
        return this.objects(ACP.allow, ValueMappings.iriToString, TermMappings.stringToIri)
    }

    get anyOf(): Set<Matcher> {
        return this.objects(ACP.anyOf, TermWrapper.as(Matcher), TermWrapper.as(Matcher))
    }
}
