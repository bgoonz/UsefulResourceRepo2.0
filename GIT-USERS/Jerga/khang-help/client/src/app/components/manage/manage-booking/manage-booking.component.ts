import { Component, OnInit } from "@angular/core";
import { BookingService } from "src/app/services/booking.service";
import { Booking } from "src/app/models/booking.model";
import { PaymentService } from "src/app/services/payment.service";
import * as moment from "moment";
import { Review } from "../../../models/review.model";
@Component({
  selector: "app-manage-booking",
  templateUrl: "./manage-booking.component.html",
  styleUrls: ["./manage-booking.component.scss"],
})
export class ManageBookingComponent implements OnInit {
  bookings: Booking[] = [];
  payments: any[];
  constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
        console.log(bookings);
      },
      () => {}
    );

    this.getPendingPayments();
  }

  getPendingPayments() {
    this.paymentService.getPendingPayments().subscribe(
      (payment: any) => {
        this.payments = payment;
      },
      () => {}
    );
  }

  acceptPayment(payment) {
    this.paymentService.acceptPayment(payment).subscribe(
      (json) => {
        payment.status = "paid";
      },
      (err) => {
        console.log(err);
      }
    );
  }
  declinePayment(payment) {
    this.paymentService.declinePayment(payment).subscribe(
      (json) => {
        payment.status = "decline";
      },
      () => {}
    );
  }

  reviewPublished(bookingIndex: number, review: Review) {
    this.bookings[bookingIndex]["review"] = review;
  }

  isExpired(endAt: string) {
    const timeNow = moment();
    const mEndAt = moment(endAt);

    return mEndAt.isBefore(timeNow);
  }
}
