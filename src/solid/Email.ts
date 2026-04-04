import { TermWrapper, LiteralAs, LiteralFrom, NamedNodeAs, NamedNodeFrom } from '@rdfjs/wrapper';
import { VCARD, RDF } from '../vocabulary/mod.js';

export class Email extends TermWrapper {
  get emailAddress(): string {
    return this.singular(VCARD.value, LiteralAs.string);
  }

  set emailAddress(value: string) {
    this.overwrite(VCARD.value, value, LiteralFrom.string);
  }

  get emailType(): string | undefined {
    return this.singularNullable(RDF.type, NamedNodeAs.string);
  }

  set emailType(value: string | undefined) {
    this.overwriteNullable(RDF.type, value, NamedNodeFrom.string);
  }
}
