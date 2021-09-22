import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "timeFormat",
})
export class TimeFormatPipe implements PipeTransform {
  transform(time: string, dateFormat = "YYYY/MM/DD"): string {
    if (!time || typeof time !== "string") {
      return "";
    }
    return moment(time).format(dateFormat);
  }
}
