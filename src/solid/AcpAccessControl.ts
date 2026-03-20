import { AccessControlPolicy } from './AccessControlPolicy';
import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class AcpAccessControl extends TermWrapper {

  get apply(): Set<AccessControlPolicy> {
    return this.objects("http://www.w3.org/ns/solid/acp#apply", ObjectMapping.as(AccessControlPolicy), ObjectMapping.as(AccessControlPolicy));
  }
}