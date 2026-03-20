import { IssueTrackerPerson } from './IssueTrackerPerson.js';
import { TermWrapper, ValueMapping, TermMapping, ObjectMapping } from "rdfjs-wrapper";

export class IssueTrackerAssigneeGroup extends TermWrapper {

  get name(): string | undefined {
    return this.singularNullable("http://www.w3.org/2006/vcard/ns#fn", ValueMapping.literalToString);
  }
  set name(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2006/vcard/ns#fn", value, TermMapping.stringToLiteral);
  }
  get member(): Set<IssueTrackerPerson> {
    return this.objects("http://www.w3.org/2006/vcard/ns#member", ObjectMapping.as(IssueTrackerPerson), ObjectMapping.as(IssueTrackerPerson));
  }
}
