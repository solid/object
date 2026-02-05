import { TermMappings, ValueMappings, TermWrapper } from "rdfjs-wrapper"
import { RDF } from "../vocabulary/rdf.js"

export class Typed extends TermWrapper {
    get type(): Set<string> {
        return this.objects(RDF.type, ValueMappings.iriToString, TermMappings.stringToIri)
    }
}
