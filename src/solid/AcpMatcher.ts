import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class AcpMatcher extends TermWrapper {

  get agent(): Set<string> {
    return this.objects("http://www.w3.org/ns/solid/acp#agent", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}