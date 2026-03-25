import { TermWrapper, ValueMapping, TermMapping } from "rdfjs-wrapper";

export class ScheduleEvent extends TermWrapper {

  get Title(): Set<string> {
    return this.objects("http://www.w3.org/2002/12/cal/ical#summary", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get location(): Set<string> {
    return this.objects("http://www.w3.org/2002/12/cal/ical#location", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
  get isAllDayEvent(): boolean | undefined {
    return this.singularNullable("http://www.w3.org/ns/pim/schedule#allDay", ValueMapping.literalToString);
  }
  set isAllDayEvent(value: boolean | undefined) {
    this.overwriteNullable("http://www.w3.org/ns/pim/schedule#allDay", value, TermMapping.stringToLiteral);
  }
  get durationDays(): Set<number> {
    return this.objects("http://www.w3.org/ns/pim/schedule#durationInDays", ValueMapping.literalToNumber, TermMapping.numberToLiteral);
  }
  get durationMinutes(): Set<number> {
    return this.objects("http://www.w3.org/ns/pim/schedule#durationInMinutes", ValueMapping.literalToNumber, TermMapping.numberToLiteral);
  }
  get comment(): Set<string> {
    return this.objects("http://www.w3.org/2002/12/cal/ical#comment", ValueMapping.literalToString, TermMapping.stringToLiteral);
  }
}
