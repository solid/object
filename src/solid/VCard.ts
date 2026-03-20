import { VCardPersonalName } from './VCardPersonalName';
import { VCardAddress } from './VCardAddress';
import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class VCard extends TermWrapper {

  get fullName(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get name(): Set<VCardPersonalName> {
    return this.objects("http://www.w3.org/2006/vcard/ns#n", ObjectMapping.as(VCardPersonalName), ObjectMapping.as(VCardPersonalName));
  }
  get email(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasEmail", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get telephone(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasTelephone", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get address(): Set<VCardAddress> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasAddress", ObjectMapping.as(VCardAddress), ObjectMapping.as(VCardAddress));
  }
  get organizationName(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#organization-name", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}