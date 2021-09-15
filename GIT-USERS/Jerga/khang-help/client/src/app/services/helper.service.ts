import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Booking } from "../models/booking.model";
@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor() {}

  public getRangeOfDates(startAt, endAt, dateFormat) {
    const tempDates = [];
    const mEndAt = moment(endAt);

    // reason why startAt should be let cuz it will be incremented
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt) {
      tempDates.push(mStartAt.format(dateFormat));
      // we increment start at till equals to endat
      mStartAt = mStartAt.add(1, "day");
    }

    // startAt has to stay like this because we initialze mStartAt
    tempDates.push(moment(startAt).format(dateFormat));
    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
  }

  public getBookingRangeOfDates(startAt, endAt) {
    return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
  }

  // create format of dates
  public formatDate(date, dateFormat) {
    return moment(date).format(dateFormat);
  }

  public formatBookingDate(date) {
    return this.formatDate(date, Booking.DATE_FORMAT);
  }
}
