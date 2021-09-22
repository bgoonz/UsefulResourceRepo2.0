import { Component, OnInit } from "@angular/core";
import { RentalService } from "../../../rental/shared/rental.service";
import { Rental } from "../../../rental/shared/rental.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.scss"],
})
export class ListingsComponent implements OnInit {
  rentals: Rental[] = [];
  errors: any[] = [];

  constructor(private rentalService: RentalService) {}

  search(city) {
    this.errors = [];
    this.rentals = [];

    this.rentalService.getRentalsByCity(city).subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
