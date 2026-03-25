import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class WebPage extends TermWrapper {

  get url(): string {
    return this.singular("http://www.w3.org/2006/vcard/ns#value", ValueMapping.literalToString);
  }
  set url(value: string) {
    this.overwrite("http://www.w3.org/2006/vcard/ns#value", value, TermMapping.stringToLiteral);
  }
}
