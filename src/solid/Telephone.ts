import { TermWrapper, ValueMappings, TermMappings } from 'rdfjs-wrapper';
import { VCARD } from '../vocabulary/mod.js';

export class Telephone extends TermWrapper {
  get phoneNumber(): string {
    return this.singular(VCARD.hasValue, ValueMappings.literalToString);
  }

  set phoneNumber(value: string) {
    this.overwrite(VCARD.hasValue, value, TermMappings.stringToLiteral);
  }

  get phoneType(): string | undefined {
    return this.singularNullable(VCARD.telephoneType, ValueMappings.iriToString);
  }

  set phoneType(value: string | undefined) {
    this.overwriteNullable(VCARD.telephoneType, value, TermMappings.stringToIri);
  }
}
