import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class Telephone extends TermWrapper {

  get telephoneType(): string | undefined {
    return this.singularNullable("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString);
  }
  set telephoneType(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value, TermMapping.stringToLiteral);
  }
  get telephoneNumber(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#value", ValueMapping.literalToString);
  }
  set telephoneNumber(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#value", value, TermMapping.stringToLiteral);
  }
}
