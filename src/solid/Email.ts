import {
    LiteralAs,
    LiteralFrom,
    NamedNodeAs,
    NamedNodeFrom,
    OptionalAs,
    OptionalFrom,
    RequiredAs,
    RequiredFrom,
    TermWrapper
} from '@rdfjs/wrapper';
import { RDF, VCARD } from '../vocabulary/mod.js';

export class Email extends TermWrapper {
  get emailAddress(): string {
    return RequiredFrom.subjectPredicate(this, VCARD.value, LiteralAs.string);
  }

  set emailAddress(value: string) {
    RequiredAs.object(this, VCARD.value, value, LiteralFrom.string);
  }

  get emailType(): string | undefined {
    return OptionalFrom.subjectPredicate(this, RDF.type, NamedNodeAs.string);
  }

  set emailType(value: string | undefined) {
    OptionalAs.object(this, RDF.type, value, NamedNodeFrom.string);
  }
}
