import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class WebId extends TermWrapper {

  get webIdType(): string {
    return this.singular("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString);
  }
  set webIdType(value: string) {
    this.overwrite("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value, TermMapping.stringToLiteral);
  }
  get webIdValue(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#value", ValueMapping.literalToString);
  }
  set webIdValue(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#value", value, TermMapping.stringToLiteral);
  }
}
