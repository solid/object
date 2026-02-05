import { TermMappings, ValueMappings } from "rdfjs-wrapper"
import { ACP } from "../../vocabulary/acp.js"
import { Typed } from "../../util/Typed.js";

export class Matcher extends Typed {
    get agent(): Set<string> {
        return this.objects(ACP.agent, ValueMappings.iriToString, TermMappings.stringToIri)
    }
}
