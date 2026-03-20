import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class GroupMemberLocalId extends TermWrapper {

  get sameAsIndividual(): string {
    return this.singular("http://www.w3.org/2002/07/owl#sameAs", ValueMapping.literalToString);
  }
  set sameAsIndividual(value: string) {
    this.overwrite("http://www.w3.org/2002/07/owl#sameAs", value, TermMapping.stringToLiteral);
  }
}