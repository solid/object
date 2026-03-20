import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class Participation extends TermWrapper {

  get startDate(): Date {
    return this.singular("http://www.w3.org/2002/12/cal/ical#dtstart", ValueMapping.literalToDate);
  }
  set startDate(value: Date) {
    this.overwrite("http://www.w3.org/2002/12/cal/ical#dtstart", value, TermMapping.dateToLiteral);
  }
  get participant(): string {
    return this.singular("http://www.w3.org/2005/01/wf/flow#participant", ValueMapping.literalToString);
  }
  set participant(value: string) {
    this.overwrite("http://www.w3.org/2005/01/wf/flow#participant", value, TermMapping.stringToLiteral);
  }
  get colorizeByAuthor(): boolean | undefined {
    return this.singularNullable("http://www.w3.org/ns/solid/terms#colorizeByAuthor", ValueMapping.literalToString);
  }
  set colorizeByAuthor(value: boolean) {
    this.overwriteNullable("http://www.w3.org/ns/solid/terms#colorizeByAuthor", value, TermMapping.stringToLiteral);
  }
  get expandImagesInline(): boolean | undefined {
    return this.singularNullable("http://www.w3.org/ns/solid/terms#expandImagesInline", ValueMapping.literalToString);
  }
  set expandImagesInline(value: boolean) {
    this.overwriteNullable("http://www.w3.org/ns/solid/terms#expandImagesInline", value, TermMapping.stringToLiteral);
  }
  get inlineImageHeight(): number | undefined {
    return this.singularNullable("http://www.w3.org/ns/solid/terms#inlineImageHeightEms", ValueMapping.literalToNumber);
  }
  set inlineImageHeight(value: number) {
    this.overwriteNullable("http://www.w3.org/ns/solid/terms#inlineImageHeightEms", value, TermMapping.numberToLiteral);
  }
  get newestFirst(): boolean | undefined {
    return this.singularNullable("http://www.w3.org/ns/solid/terms#newestFirst", ValueMapping.literalToString);
  }
  set newestFirst(value: boolean) {
    this.overwriteNullable("http://www.w3.org/ns/solid/terms#newestFirst", value, TermMapping.stringToLiteral);
  }
  get backgroundColor(): string | undefined {
    return this.singularNullable("http://www.w3.org/ns/ui#backgroundColor", ValueMapping.literalToString);
  }
  set backgroundColor(value: string) {
    this.overwriteNullable("http://www.w3.org/ns/ui#backgroundColor", value, TermMapping.stringToLiteral);
  }
}