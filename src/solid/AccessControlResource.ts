import { AcpAccessControl } from './AcpAccessControl';
import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class AccessControlResource extends TermWrapper {

  get accessControl(): Set<AcpAccessControl> {
    return this.objects("http://www.w3.org/ns/solid/acp#accessControl", ObjectMapping.as(AcpAccessControl), ObjectMapping.as(AcpAccessControl));
  }
  get resource(): string | undefined {
    return this.singularNullable("http://www.w3.org/ns/solid/acp#resource", ValueMapping.iriToString);
  }
  set resource(value: string) {
    this.overwriteNullable("http://www.w3.org/ns/solid/acp#resource", value, TermMapping.stringToIri);
  }
}