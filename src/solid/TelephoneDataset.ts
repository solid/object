import { DatasetWrapper } from 'rdfjs-wrapper';
import { VCARD } from '../vocabulary/vcard.js';
import { Telephone } from './Telephone';

export class TelephoneDataset extends DatasetWrapper {
  get telephone(): Iterable<Telephone> {
    return this.objectsOf(VCARD.hasTelephone, Telephone);
  }
}
