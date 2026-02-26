import { TermWrapper, ValueMappings, TermMappings } from 'rdfjs-wrapper';
import { VCARD, RDF } from '../vocabulary/mod.js';

export class Email extends TermWrapper {
  get emailAddress(): string {
    return this.singular(VCARD.value, ValueMappings.literalToString);
  }

  set emailAddress(value: string) {
    this.overwrite(VCARD.value, value, TermMappings.stringToLiteral);
  }

  get emailType(): string | undefined {
    return this.singularNullable(RDF.type, ValueMappings.iriToString);
  }

  set emailType(value: string | undefined) {
    this.overwriteNullable(RDF.type, value, TermMappings.stringToIri);
  }
}
