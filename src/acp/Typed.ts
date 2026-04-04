import { TermWrapper, NamedNodeAs, NamedNodeFrom } from "@rdfjs/wrapper"
import { RDF } from "../vocabulary/mod.js"

export class Typed extends TermWrapper {
    get type(): Set<string> {
        return this.objects(RDF.type, NamedNodeAs.string, NamedNodeFrom.string)
    }
}
