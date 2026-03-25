import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class VCardPersonalName extends TermWrapper {

  get familyName(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#family-name", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get givenName(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#given-name", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get additionalName(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#additional-name", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get honorificPrefix(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#honorific-prefix", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get honorificSuffix(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#honorific-suffix", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
