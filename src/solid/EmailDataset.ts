import { DatasetWrapper } from 'rdfjs-wrapper';
import { VCARD } from '../vocabulary/mod.js';
import { Email } from './Email.js';

export class EmailDataset extends DatasetWrapper {
  get email(): Iterable<Email> {
    return this.objectsOf(VCARD.hasEmail, Email);
  }
}
