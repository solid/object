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
import { VCARD } from '../vocabulary/mod.js';

export class Telephone extends TermWrapper {
  get phoneNumber(): string {
    return RequiredFrom.subjectPredicate(this, VCARD.hasValue, LiteralAs.string);
  }

  set phoneNumber(value: string) {
    RequiredAs.object(this, VCARD.hasValue, value, LiteralFrom.string);
  }

  get phoneType(): string | undefined {
    return OptionalFrom.subjectPredicate(this, VCARD.telephoneType, NamedNodeAs.string);
  }

  set phoneType(value: string | undefined) {
    OptionalAs.object(this, VCARD.telephoneType, value, NamedNodeFrom.string);
  }
}
