import { Resource } from './Resource.js';
import { TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class Container extends TermWrapper {

  get contains(): Set<Resource> {
    return this.objects("http://www.w3.org/ns/ldp#contains", ObjectMapping.as(Resource), ObjectMapping.as(Resource));
  }
}
