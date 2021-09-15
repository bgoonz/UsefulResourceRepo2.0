import { Component, OnInit, Input } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Booking } from "src/app/models/booking.model";
@Component({
  selector: "app-manage-rental-booking",
  templateUrl: "./manage-rental-booking.component.html",
  styleUrls: ["./manage-rental-booking.component.scss"],
})
export class ManageRentalBookingComponent implements OnInit {
  @Input() bookings: Booking[];

  constructor(public modalService: NgbModal) {}

  ngOnInit() {}
}
