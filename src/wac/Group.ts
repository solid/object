import { NamedNodeAs, NamedNodeFrom, SetFrom, TermWrapper } from "@rdfjs/wrapper"
import { VCARD } from "../vocabulary/mod.js"

export class Group extends TermWrapper {
    get hasMember(): Set<string> {
        return SetFrom.subjectPredicate(this, VCARD.hasMember, NamedNodeAs.string, NamedNodeFrom.string)
    }
}
