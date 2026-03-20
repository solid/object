import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class TelephoneAsIRI extends TermWrapper {

  get telephoneNumber(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#value", ValueMapping.literalToString);
  }
  set telephoneNumber(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#value", value, TermMapping.stringToLiteral);
  }
}
