import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Booking } from "src/app/booking/shared/booking.model";
import { BookingService } from "src/app/booking/shared/booking.service";

@Component({
  selector: "bwm-booking-listing",
  templateUrl: "./booking-listing.component.html",
  styleUrls: ["./booking-listing.component.scss"],
})
export class BookingListingComponent implements OnInit {
  @Input("title") title: string;
  @Input("getBookings") getBookings: () => Observable<Booking[]>;
  @Input("type") type: string;

  bookings: Booking[];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.getBookings().subscribe((bookings) => (this.bookings = bookings));
  }

  deleteBooking(bookingId: string) {
    const canDelete = this.askForPermission();
    if (!canDelete) {
      return;
    }

    this.bookingService.deleteBooking(bookingId).subscribe(
      (_) => {
        const index = this.bookings.findIndex((b) => b._id === bookingId);
        this.bookings.splice(index, 1);

        alert("Booking has been deleted!");
      },
      (_) => alert("Booking cannot be deleted!")
    );
  }

  private askForPermission(): boolean {
    return window.confirm("Are you sure you want to delete booking?");
  }
}
