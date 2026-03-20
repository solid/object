import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class Address extends TermWrapper {

  get streetAddress(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#street-address", ValueMapping.literalToString);
  }
  set streetAddress(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#street-address", value, TermMapping.stringToLiteral);
  }
  get locality(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#locality", ValueMapping.literalToString);
  }
  set locality(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#locality", value, TermMapping.stringToLiteral);
  }
  get postalCode(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#postal-code", ValueMapping.literalToString);
  }
  set postalCode(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#postal-code", value, TermMapping.stringToLiteral);
  }
  get region(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#region", ValueMapping.literalToString);
  }
  set region(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#region", value, TermMapping.stringToLiteral);
  }
  get countryName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#country-name", ValueMapping.literalToString);
  }
  set countryName(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#country-name", value, TermMapping.stringToLiteral);
  }
}
