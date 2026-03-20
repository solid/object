import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class AddressBook extends TermWrapper {

  get formattedName(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get nameEmailIndex(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#nameEmailIndex", ValueMapping.iriToString, TermMapping.stringToIri);
  }
  get groupIndex(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#groupIndex", ValueMapping.iriToString);
  }
  set groupIndex(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#groupIndex", value, TermMapping.stringToIri);
  }
  get includesGroup(): Set<string> {
    return this.objects("http://www.w3.org/2006/vcard/ns#includesGroup", ValueMapping.iriToString, TermMapping.stringToIri);
  }
  get inAddressBook(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#inAddressBook", ValueMapping.iriToString);
  }
  set inAddressBook(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#inAddressBook", value, TermMapping.stringToIri);
  }
}
