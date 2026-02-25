import { TermWrapper, ValueMapping, TermMapping } from 'rdfjs-wrapper';
import { VCARD } from '../vocabulary/mod.js';

export class Telephone extends TermWrapper {
  get phoneNumber(): string {
    return this.singular(VCARD.hasValue, ValueMapping.literalToString) || '';
  }

  set phoneNumber(value: string) {
    this.overwrite(VCARD.hasValue, value, TermMapping.stringToLiteral);
  }

  get phoneType(): string | undefined {
    return this.singularNullable(VCARD.telephoneType, ValueMapping.iriToString);
  }

  set phoneType(value: string | undefined) {
    this.overwriteNullable(VCARD.telephoneType, value, TermMapping.stringToIri);
  }
}
