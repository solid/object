import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class ContactPerson extends TermWrapper {

  get Individual(): string | undefined {
    return this.singularNullable("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString);
  }
  set Individual(value: string) {
    this.overwriteNullable("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value, TermMapping.stringToLiteral);
  }
  get fullName(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get identifier(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#hasUID", ValueMapping.literalToString);
  }
  set identifier(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#hasUID", value, TermMapping.stringToLiteral);
  }
  get name(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#hasName", ValueMapping.literalToString);
  }
  set name(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#hasName", value, TermMapping.stringToLiteral);
  }
  get photo(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasPhoto", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get related(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasRelated", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get url(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#url", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get address(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasAddress", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get dateOfBirth(): Date | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#bday", ValueMapping.literalToDate);
  }
  set dateOfBirth(value: Date) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#bday", value, TermMapping.dateToLiteral);
  }
  get email(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasEmail", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get telephone(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#hasTelephone", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get organizationName(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#organization-name", ValueMapping.literalToString);
  }
  set organizationName(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#organization-name", value, TermMapping.stringToLiteral);
  }
  get role(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#role", ValueMapping.literalToString);
  }
  set role(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#role", value, TermMapping.stringToLiteral);
  }
  get title(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#title", ValueMapping.literalToString);
  }
  set title(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#title", value, TermMapping.stringToLiteral);
  }
  get notes(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#note", ValueMapping.literalToString);
  }
  set notes(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#note", value, TermMapping.stringToLiteral);
  }
  get sameAs(): Set<string> {
    return this.objects("http://www.w3.org/2002/07/owl#sameAs", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get inAddressBook(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#inAddressBook", ValueMapping.literalToString);
  }
  set inAddressBook(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#inAddressBook", value, TermMapping.stringToLiteral);
  }
}