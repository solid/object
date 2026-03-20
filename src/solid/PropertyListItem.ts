import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class PropertyListItem extends TermWrapper {

  get propertyName(): string {
    return this.singular("http://www.w3.org/2000/01/rdf-schema#label", ValueMapping.literalToString);
  }
  set propertyName(value: string) {
    this.overwrite("http://www.w3.org/2000/01/rdf-schema#label", value, TermMapping.stringToLiteral);
  }
}
