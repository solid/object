import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class AccessControlPolicy extends TermWrapper {

  get type(): Set<string> {
    return this.objects("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}