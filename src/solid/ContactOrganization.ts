import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class ContactOrganization extends TermWrapper {

  get name(): string | undefined {
    return this.singularNullable("http://schema.org/name", ValueMapping.literalToString);
  }
  set name(value: string) {
    this.overwriteNullable("http://schema.org/name", value, TermMapping.stringToLiteral);
  }
  get homepageURL(): Set<string> {
    return this.objects("http://schema.org/url", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get typeCategory(): Set<string> {
    return this.objects("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}