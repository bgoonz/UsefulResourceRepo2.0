import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "../shared/rental.service";
import { Rental } from "../shared/rental.model";

@Component({
  selector: "app-rental-detail",
  templateUrl: "./rental-detail.component.html",
  styleUrls: ["./rental-detail.component.scss"],
})
export class RentalDetailComponent implements OnInit {
  currentId: string;
  rental: Rental;

  get rentalLocation(): string {
    return `${this.rental.city}, ${this.rental.street}`;
  }

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.rental = new Rental();
    this.route.params.subscribe((params) => {
      this.getRental(params["rentalId"]);
    });
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental: Rental) => {
      this.rental = rental;
    });
    console.log(this.rental);
  }
}
