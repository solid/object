import { ContactDetailsPerson } from './ContactDetailsPerson';
import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class Group extends TermWrapper {

  get name(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get member(): Set<ContactDetailsPerson> {
    return this.objects("http://www.w3.org/2006/vcard/ns#member", ObjectMapping.as(ContactDetailsPerson), ObjectMapping.as(ContactDetailsPerson));
  }
}