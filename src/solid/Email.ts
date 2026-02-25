import { TermWrapper, ValueMapping, TermMapping } from 'rdfjs-wrapper';
import { VCARD, RDF } from '../vocabulary/mod.js';

export class Email extends TermWrapper {
  get emailAddress(): string {
    return this.singular(VCARD.value, ValueMapping.literalToString);
  }

  set emailAddress(value: string) {
    this.overwrite(VCARD.value, value, TermMapping.stringToLiteral);
  }

  get emailType(): string | undefined {
    return this.singularNullable(RDF.type, ValueMapping.iriToString);
  }

  set emailType(value: string | undefined) {
    this.overwriteNullable(RDF.type, value, TermMapping.stringToIri);
  }
}
