import { ChatSharedPreferences } from './ChatSharedPreferences';
import { Participation } from './Participation';
import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class ChatChannel extends TermWrapper {

  get type(): Set<string> {
    return this.objects("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get author(): Set<string> {
    return this.objects("http://purl.org/dc/elements/1.1/author", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get title(): string {
    return this.singular("http://purl.org/dc/elements/1.1/title", ValueMapping.literalToString);
  }
  set title(value: string) {
    this.overwrite("http://purl.org/dc/elements/1.1/title", value, TermMapping.stringToLiteral);
  }
  get createdDate(): Date {
    return this.singular("http://purl.org/dc/elements/1.1/created", ValueMapping.literalToDate);
  }
  set createdDate(value: Date) {
    this.overwrite("http://purl.org/dc/elements/1.1/created", value, TermMapping.dateToLiteral);
  }
  get sharedPreferences(): Set<ChatSharedPreferences> {
    return this.objects("http://www.w3.org/ns/ui#sharedPreferences", ObjectMapping.as(ChatSharedPreferences), ObjectMapping.as(ChatSharedPreferences));
  }
  get participation(): Set<Participation> {
    return this.objects("http://www.w3.org/2005/01/wf/flow#participation", ObjectMapping.as(Participation), ObjectMapping.as(Participation));
  }
}