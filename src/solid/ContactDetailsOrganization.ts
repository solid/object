import { Address } from './Address.js';
import { EmailWithType } from './EmailWithType.js';
import { Telephone } from './Telephone.js';
import { TermWrapper, ValueMapping, TermMapping, ObjectMapping } from "rdfjs-wrapper";

export class ContactDetailsOrganization extends TermWrapper {

  get organizationType(): Set<string> {
    return this.objects("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get name(): Set<string> {
    return this.objects("http://schema.org/name", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get homepageURL(): Set<string> {
    return this.objects("http://schema.org/url", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get hasAddress(): Set<Address> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasAddress", ObjectMapping.as(Address), ObjectMapping.as(Address));
  }
  get hasEmailAddress(): Set<EmailWithType> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasEmail", ObjectMapping.as(EmailWithType), ObjectMapping.as(EmailWithType));
  }
  get hasTelephoneNumber(): Set<Telephone> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasTelephone", ObjectMapping.as(Telephone), ObjectMapping.as(Telephone));
  }
  get notes(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#note", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
