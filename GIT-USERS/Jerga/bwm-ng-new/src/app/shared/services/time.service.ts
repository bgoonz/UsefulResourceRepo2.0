import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class TimeService {
  getRangeOfDates(startAt: string, endAt: string): string[] {
    const dates = [];
    let mStartAt = moment(new Date(startAt));
    const mEndAt = moment(new Date(endAt));

    while (mStartAt < mEndAt) {
      dates.push(mStartAt.format());
      mStartAt = mStartAt.add(1, "day");
    }

    return dates;
  }

  isDateInPast(date: moment.Moment): boolean {
    return date.diff(moment(), "days") < 0;
  }

  format(date: string, dateFormat = "YYYY/MM/DD") {
    if (!date) {
      return "";
    }
    return moment(date).format(dateFormat);
  }
}
