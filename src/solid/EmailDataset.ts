import { DatasetWrapper } from 'rdfjs-wrapper';
import { VCARD } from '../vocabulary/mod.js';
import { Email } from './Email.js';

export class EmailDataset extends DatasetWrapper {
  get emails(): Iterable<Email> {
    const objects = new Set([
                ...this.instancesOf(VCARD.Email, Email),
                ...this.objectsOf(VCARD.hasEmail, Email),
                ...this.objectsOf(VCARD.email, Email),
            ])

    return objects
  }
}
