import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class VCardAddress extends TermWrapper {

  get streetAddress(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#street-address", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get extendedAddress(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#extended-address", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get locality(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#locality", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get region(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#region", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get postalCode(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#postal-code", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get countryName(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#country-name", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
