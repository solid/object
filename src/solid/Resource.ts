import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class Resource extends TermWrapper {

  get title(): string | undefined {
    return this.singularNullable("http://purl.org/dc/elements/1.1/title", ValueMapping.literalToString);
  }
  set title(value: string | undefined) {
    this.overwriteNullable("http://purl.org/dc/elements/1.1/title", value, TermMapping.stringToLiteral);
  }
  get label(): string | undefined {
    return this.singularNullable("http://www.w3.org/2000/01/rdf-schema#label", ValueMapping.literalToString);
  }
  set label(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2000/01/rdf-schema#label", value, TermMapping.stringToLiteral);
  }
  get modified(): Date | undefined {
    return this.singularNullable("http://purl.org/dc/elements/1.1/modified", ValueMapping.literalToDate);
  }
  set modified(value: Date | undefined) {
    this.overwriteNullable("http://purl.org/dc/elements/1.1/modified", value, TermMapping.dateToLiteral);
  }
  get mtime(): Date | undefined {
    return this.singularNullable("http://www.w3.org/ns/posix/stat#mtime", ValueMapping.literalToDate);
  }
  set mtime(value: Date | undefined) {
    this.overwriteNullable("http://www.w3.org/ns/posix/stat#mtime", value, TermMapping.dateToLiteral);
  }
  get size(): number | undefined {
    return this.singularNullable("http://www.w3.org/ns/posix/stat#size", ValueMapping.literalToNumber);
  }
  set size(value: number | undefined) {
    this.overwriteNullable("http://www.w3.org/ns/posix/stat#size", value, TermMapping.numberToLiteral);
  }
  get type(): Set<string> {
    return this.objects("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
