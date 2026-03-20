import { Address } from './Address';
import { EmailWithType } from './EmailWithType';
import { Telephone } from './Telephone';
import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class ContactDetailsPerson extends TermWrapper {

  get fullName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString);
  }
  set fullName(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#fn", value, TermMapping.stringToLiteral);
  }
  get role(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#role", ValueMapping.literalToString);
  }
  set role(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#role", value, TermMapping.stringToLiteral);
  }
  get organizationName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#organization-name", ValueMapping.literalToString);
  }
  set organizationName(value: string) {
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
  set dateOfBirth(value: Date) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#bday", value, TermMapping.dateToLiteral);
  }
  get notes(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#note", ValueMapping.literalToString);
  }
  set notes(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#note", value, TermMapping.stringToLiteral);
  }
}