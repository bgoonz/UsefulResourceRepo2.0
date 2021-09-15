import { Component, OnInit } from "@angular/core";
import { Rental } from "src/app/models/rental.model";
import { RentalService } from "src/app/services/rental.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-rental-create",
  templateUrl: "./rental-create.component.html",
  styleUrls: ["./rental-create.component.scss"],
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];
  constructor(private rentalService: RentalService, private router: Router) {}

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.err;
      }
    );
  }

  handleImageUpload(imageUrl: string) {
    this.newRental.image = imageUrl;
  }

  handleImageError() {
    this.newRental.image = undefined;
  }

  handleImageChange() {
    this.newRental.image =
      "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg";
  }
}
