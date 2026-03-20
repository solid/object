import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class ChatMessage extends TermWrapper {

  get createdDate(): Date {
    return this.singular("http://purl.org/dc/terms/created", ValueMapping.literalToDate);
  }
  set createdDate(value: Date) {
    this.overwrite("http://purl.org/dc/terms/created", value, TermMapping.dateToLiteral);
  }
  get author(): string {
    return this.singular("http://xmlns.com/foaf/0.1/maker", ValueMapping.literalToString);
  }
  set author(value: string) {
    this.overwrite("http://xmlns.com/foaf/0.1/maker", value, TermMapping.stringToLiteral);
  }
  get content(): string {
    return this.singular("http://rdfs.org/sioc/ns#content", ValueMapping.literalToString);
  }
  set content(value: string) {
    this.overwrite("http://rdfs.org/sioc/ns#content", value, TermMapping.stringToLiteral);
  }
  get relatedChatChannel(): Set<string> {
    return this.objects("n3-52", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
