import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class Bookmark extends TermWrapper {

  get label(): Set<string> {
    return this.objects("http://www.w3.org/2000/01/rdf-schema#label", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get url(): Set<string> {
    return this.objects("http://www.w3.org/2002/01/bookmark#recalls", ValueMapping.iriToString, TermMapping.stringToIri);
  }
  get topic(): Set<string> {
    return this.objects("http://www.w3.org/2002/01/bookmark#hasTopic", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get description(): Set<string> {
    return this.objects("http://www.w3.org/2000/01/rdf-schema#comment", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
