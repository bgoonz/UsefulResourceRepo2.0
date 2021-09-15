import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from "@angular/core";
import { Booking } from "../../../../models/booking.model";
import { HelperService } from "../../../../services/helper.service";
import * as moment from "moment";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Rental } from "src/app/models/rental.model";
import { AuthService } from "src/app/services/auth.service";
import { BookingService } from "src/app/services/booking.service";
import { DaterangePickerComponent } from "ng2-daterangepicker";
import { ToastrService } from "ngx-toastr";
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-rental-detail-booking",
  templateUrl: "./rental-detail-booking.component.html",
  styleUrls: ["./rental-detail-booking.component.scss"],
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;

  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  bookings: Booking[];
  newBooking: Booking;
  modalRef: any;
  daterange: any = {};
  bookedOutDates: any[] = [];

  errors: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: "left",
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this),
  };

  constructor(
    private helperService: HelperService,
    private modalService: NgbModal,
    public authService: AuthService,
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helperService.getBookingRangeOfDates(
          booking.startAt,
          booking.endAt
        );

        //  spread operators will get arrays of just single day
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  private checkForInvalidDates(date) {
    return (
      this.bookedOutDates.includes(
        this.helperService.formatBookingDate(date)
      ) ||
      // we check if any days is before today and disable them
      date.diff(moment(), "days") < 0
    );
  }

  private addNewBookedOutDates(bookingData: any) {
    const dateRange = this.helperService.getBookingRangeOfDates(
      bookingData.startAt,
      bookingData.endAt
    );

    this.bookedOutDates.push(...dateRange);
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val("");
  }

  onPaymentConfirmed(paymentToken: any) {
    this.newBooking.paymentToken = paymentToken;
  }

  createBooking() {
    this.newBooking.rental = this.rental;

    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) => {
        this.addNewBookedOutDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success(
          "Booking has been successfully created, check your booking detail in manage section",
          "Success!"
        );
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.err;
        console.log(this.errors);
      }
    );
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
    this.newBooking.endAt = this.helperService.formatBookingDate(value.end);

    // when console log the days different is negative so we have to put negative in front of this
    // and also it displays in milliseconds so we have to put "days" in order for it to format to days
    this.newBooking.days = -value.start.diff(value.end, "days");
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
}
