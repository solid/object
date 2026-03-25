import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class PersonalName extends TermWrapper {

  get familyName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#family-name", ValueMapping.literalToString);
  }
  set familyName(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#family-name", value, TermMapping.stringToLiteral);
  }
  get givenName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#given-name", ValueMapping.literalToString);
  }
  set givenName(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#given-name", value, TermMapping.stringToLiteral);
  }
  get additionalName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#additional-name", ValueMapping.literalToString);
  }
  set additionalName(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#additional-name", value, TermMapping.stringToLiteral);
  }
  get honorificPrefix(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#honorific-prefix", ValueMapping.literalToString);
  }
  set honorificPrefix(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#honorific-prefix", value, TermMapping.stringToLiteral);
  }
  get honorificSuffix(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#honorific-suffix", ValueMapping.literalToString);
  }
  set honorificSuffix(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#honorific-suffix", value, TermMapping.stringToLiteral);
  }
}
