import { IssueTrackerAssigneeGroup } from './IssueTrackerAssigneeGroup.js';
import { PropertyListItem } from './PropertyListItem.js';
import { TermWrapper, ValueMapping, TermMapping, ObjectMapping } from "rdfjs-wrapper";

export class IssueTracker extends TermWrapper {

  get title(): string | undefined {
    return this.singularNullable("http://purl.org/dc/terms/title", ValueMapping.literalToString);
  }
  set title(value: string | undefined) {
    this.overwriteNullable("http://purl.org/dc/terms/title", value, TermMapping.stringToLiteral);
  }
  get description(): string | undefined {
    return this.singularNullable("http://www.w3.org/2005/01/wf/flow#description", ValueMapping.literalToString);
  }
  set description(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2005/01/wf/flow#description", value, TermMapping.stringToLiteral);
  }
  get issueState(): Set<string> {
    return this.objects("http://www.w3.org/2005/01/wf/flow#issueClass", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get issueCategory(): Set<string> {
    return this.objects("http://www.w3.org/2005/01/wf/flow#issueCategory", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get allowSubIssues(): boolean | undefined {
    return this.singularNullable("http://www.w3.org/2005/01/wf/flow#allowSubIssues", ValueMapping.literalToString);
  }
  set allowSubIssues(value: boolean | undefined) {
    this.overwriteNullable("http://www.w3.org/2005/01/wf/flow#allowSubIssues", value, TermMapping.stringToLiteral);
  }
  get additionalProperties(): Set<PropertyListItem> {
    return this.objects("http://www.w3.org/2005/01/wf/flow#propertyList", ObjectMapping.as(PropertyListItem), ObjectMapping.as(PropertyListItem));
  }
  get assigneeGroup(): Set<IssueTrackerAssigneeGroup> {
    return this.objects("http://www.w3.org/2005/01/wf/flow#assigneeGroup", ObjectMapping.as(IssueTrackerAssigneeGroup), ObjectMapping.as(IssueTrackerAssigneeGroup));
  }
}
