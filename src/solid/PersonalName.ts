import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class PersonalName extends TermWrapper {

  get familyName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#family-name", ValueMapping.literalToString);
  }
  set familyName(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#family-name", value, TermMapping.stringToLiteral);
  }
  get givenName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#given-name", ValueMapping.literalToString);
  }
  set givenName(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#given-name", value, TermMapping.stringToLiteral);
  }
  get additionalName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#additional-name", ValueMapping.literalToString);
  }
  set additionalName(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#additional-name", value, TermMapping.stringToLiteral);
  }
  get honorificPrefix(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#honorific-prefix", ValueMapping.literalToString);
  }
  set honorificPrefix(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#honorific-prefix", value, TermMapping.stringToLiteral);
  }
  get honorificSuffix(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#honorific-suffix", ValueMapping.literalToString);
  }
  set honorificSuffix(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#honorific-suffix", value, TermMapping.stringToLiteral);
  }
}