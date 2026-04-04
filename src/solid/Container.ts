import { TermAs, TermFrom } from "@rdfjs/wrapper"
import { Resource } from "./Resource.js"
import { LDP } from "../vocabulary/mod.js"

export class Container extends Resource {
    public get contains(): Set<Resource> {
        return this.objects(LDP.contains, TermAs.instance(Resource), TermFrom.instance)
    }
}
