import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "src/app/services/rental.service";
import { Rental } from "src/app/models/rental.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-rental-search",
  templateUrl: "./rental-search.component.html",
  styleUrls: ["./rental-search.component.scss"],
})
export class RentalSearchComponent implements OnInit {
  city: string;
  rentals: Rental[] = [];

  errors: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.city = params["city"];
      this.getRentals();
    });
  }

  getRentals() {
    // the reason why errors and rentals should be initialize as empty array first
    // is because if we don't have that they will return the errors (if we type not found city)
    // and also the results (if found city)
    this.errors = [];
    this.rentals = [];

    this.rentalService.getRentalsByCity(this.city).subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.err;
      }
    );
  }
}
