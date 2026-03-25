import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class EmailWithType extends TermWrapper {

  get emailAddress(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#value", ValueMapping.literalToString);
  }
  set emailAddress(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#value", value, TermMapping.stringToLiteral);
  }
  get emailType(): Set<string> {
    return this.objects("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
