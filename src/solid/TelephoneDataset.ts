import { DatasetWrapper } from '@rdfjs/wrapper';
import { VCARD } from '../vocabulary/vcard.js';
import { Telephone } from './Telephone.js';

export class TelephoneDataset extends DatasetWrapper {
  get telephones(): Iterable<Telephone> {
    const objects = new Set([
                ...this.objectsOf(VCARD.hasTelephone, Telephone),
                ...this.objectsOf(VCARD.tel, Telephone),
            ])

    return objects
  }
}
