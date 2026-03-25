import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class Meeting extends TermWrapper {

  get summary(): string | undefined {
    return this.singularNullable("http://www.w3.org/2002/12/cal/ical#summary", ValueMapping.literalToString);
  }
  set summary(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2002/12/cal/ical#summary", value, TermMapping.stringToLiteral);
  }
  get location(): string | undefined {
    return this.singularNullable("http://www.w3.org/2002/12/cal/ical#location", ValueMapping.literalToString);
  }
  set location(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2002/12/cal/ical#location", value, TermMapping.stringToLiteral);
  }
  get startDate(): Date | undefined {
    return this.singularNullable("http://www.w3.org/2002/12/cal/ical#dtstart", ValueMapping.literalToDate);
  }
  set startDate(value: Date | undefined) {
    this.overwriteNullable("http://www.w3.org/2002/12/cal/ical#dtstart", value, TermMapping.dateToLiteral);
  }
  get endDate(): Date | undefined {
    return this.singularNullable("http://www.w3.org/2002/12/cal/ical#dtend", ValueMapping.literalToDate);
  }
  set endDate(value: Date | undefined) {
    this.overwriteNullable("http://www.w3.org/2002/12/cal/ical#dtend", value, TermMapping.dateToLiteral);
  }
  get comment(): string | undefined {
    return this.singularNullable("http://www.w3.org/2002/12/cal/ical#comment", ValueMapping.literalToString);
  }
  set comment(value: string | undefined) {
    this.overwriteNullable("http://www.w3.org/2002/12/cal/ical#comment", value, TermMapping.stringToLiteral);
  }
}
