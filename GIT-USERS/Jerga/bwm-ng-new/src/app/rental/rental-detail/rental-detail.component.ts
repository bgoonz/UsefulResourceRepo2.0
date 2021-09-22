import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "../shared/rental.service";
import { Rental } from "../shared/rental.model";
import { AuthService } from "src/app/auth/shared/auth.service";

@Component({
  selector: "bwm-rental-detail",
  templateUrl: "./rental-detail.component.html",
  styleUrls: ["./rental-detail.component.scss"],
})
export class RentalDetailComponent implements OnInit {
  rental: Rental;

  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.rentalService
        .getRentalById(params["rentalId"])
        .subscribe((rental) => {
          this.rental = rental;
        });
    });
  }

  get rentalLocation(): string {
    return `${this.rental.city}, ${this.rental.street}`;
  }
}
