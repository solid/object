import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class WebIdAgent extends TermWrapper {

  get vcardFn(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString);
  }
  set vcardFn(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#fn", value, TermMapping.stringToLiteral);
  }
  get vcardHasUrl(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#hasUrl", ValueMapping.literalToString);
  }
  set vcardHasUrl(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#hasUrl", value, TermMapping.stringToLiteral);
  }
  get organization(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#organizationName", ValueMapping.literalToString);
  }
  set organization(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#organizationName", value, TermMapping.stringToLiteral);
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
  get hasTelephone(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#hasTelephone", ValueMapping.literalToString);
  }
  set hasTelephone(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#hasTelephone", value, TermMapping.stringToLiteral);
  }
  get foafName(): string | undefined {
    return this.singularNullable("http://xmlns.com/foaf/0.1/name", ValueMapping.literalToString);
  }
  set foafName(value: string) {
    this.overwriteNullable("http://xmlns.com/foaf/0.1/name", value, TermMapping.stringToLiteral);
  }
  get name(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#hasName", ValueMapping.literalToString);
  }
  set name(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#hasName", value, TermMapping.stringToLiteral);
  }
  get foafHomepage(): string | undefined {
    return this.singularNullable("http://xmlns.com/foaf/0.1/homepage", ValueMapping.literalToString);
  }
  set foafHomepage(value: string) {
    this.overwriteNullable("http://xmlns.com/foaf/0.1/homepage", value, TermMapping.stringToLiteral);
  }
  get photoUrl(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#hasPhoto", ValueMapping.literalToString);
  }
  set photoUrl(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#hasPhoto", value, TermMapping.stringToLiteral);
  }
  get hasEmail(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#hasEmail", ValueMapping.literalToString);
  }
  set hasEmail(value: string) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#hasEmail", value, TermMapping.stringToLiteral);
  }
  get inAddressBook(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#inAddressBook", ValueMapping.literalToString);
  }
  set inAddressBook(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#inAddressBook", value, TermMapping.stringToLiteral);
  }
  get pimStorage(): Set<string> {
    return this.objects("http://www.w3.org/ns/pim/space#storage", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get solidStorage(): Set<string> {
    return this.objects("https://www.w3.org/ns/solid/terms#storage", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get knows(): Set<string> {
    return this.objects("http://xmlns.com/foaf/0.1/knows", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}