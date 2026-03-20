import { ValueMapping, TermMapping, TermWrapper, ObjectMapping } from "rdfjs-wrapper";

export class ChatAction extends TermWrapper {

  get type(): Set<string> {
    return this.objects("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get agent(): string | undefined {
    return this.singularNullable("https://schema.org/agent", ValueMapping.literalToString);
  }
  set agent(value: string) {
    this.overwriteNullable("https://schema.org/agent", value, TermMapping.stringToLiteral);
  }
}