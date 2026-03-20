import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class Email extends TermWrapper {

  get emailAddress(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#value", ValueMapping.literalToString);
  }
  set emailAddress(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#value", value, TermMapping.stringToLiteral);
  }
}
