import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class ChatSharedPreferences extends TermWrapper {

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
}