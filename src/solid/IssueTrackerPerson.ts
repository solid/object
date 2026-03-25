import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class IssueTrackerPerson extends TermWrapper {

  get fullName(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString);
  }
  set fullName(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#fn", value, TermMapping.stringToLiteral);
  }
  get solidId(): string | undefined {
    return this.singularNullable("http://www.w3.org/2002/07/owl#sameAs", ValueMapping.literalToString);
  }
  set solidId(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2002/07/owl#sameAs", value, TermMapping.stringToLiteral);
  }
  get phone(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#phone", ValueMapping.literalToString);
  }
  set phone(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#phone", value, TermMapping.stringToLiteral);
  }
  get emailAddress(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#email", ValueMapping.literalToString);
  }
  set emailAddress(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#email", value, TermMapping.stringToLiteral);
  }
}
