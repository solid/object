import { TermWrapper, LiteralAs, LiteralFrom, NamedNodeAs, NamedNodeFrom } from '@rdfjs/wrapper';
import { VCARD } from '../vocabulary/mod.js';

export class Telephone extends TermWrapper {
  get phoneNumber(): string {
    return this.singular(VCARD.hasValue, LiteralAs.string);
  }

  set phoneNumber(value: string) {
    this.overwrite(VCARD.hasValue, value, LiteralFrom.string);
  }

  get phoneType(): string | undefined {
    return this.singularNullable(VCARD.telephoneType, NamedNodeAs.string);
  }

  set phoneType(value: string | undefined) {
    this.overwriteNullable(VCARD.telephoneType, value, NamedNodeFrom.string);
  }
}
