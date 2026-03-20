import { Address } from './Address.js';
import { EmailWithType } from './EmailWithType.js';
import { Telephone } from './Telephone.js';
import { TermWrapper, ValueMapping, TermMapping, ObjectMapping } from "rdfjs-wrapper";

export class ContactDetailsPerson extends TermWrapper {

  get fullName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString);
  }
  set fullName(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#fn", value, TermMapping.stringToLiteral);
  }
  get role(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#role", ValueMapping.literalToString);
  }
  set role(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#role", value, TermMapping.stringToLiteral);
  }
  get organizationName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#organization-name", ValueMapping.literalToString);
  }
  set organizationName(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#organization-name", value, TermMapping.stringToLiteral);
  }
  get address(): Set<Address> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasAddress", ObjectMapping.as(Address), ObjectMapping.as(Address));
  }
  get email(): Set<EmailWithType> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasEmail", ObjectMapping.as(EmailWithType), ObjectMapping.as(EmailWithType));
  }
  get telephone(): Set<Telephone> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasTelephone", ObjectMapping.as(Telephone), ObjectMapping.as(Telephone));
  }
  get dateOfBirth(): Date | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#bday", ValueMapping.literalToDate);
  }
  set dateOfBirth(value: Date | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#bday", value, TermMapping.dateToLiteral);
  }
  get notes(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#note", ValueMapping.literalToString);
  }
  set notes(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#note", value, TermMapping.stringToLiteral);
  }
}
