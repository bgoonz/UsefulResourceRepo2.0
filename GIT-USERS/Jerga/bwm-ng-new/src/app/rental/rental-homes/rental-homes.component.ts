import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { RentalService } from "../shared/rental.service";
import { Rental } from "../shared/rental.model";

@Component({
  selector: "bwm-rental-homes",
  templateUrl: "./rental-homes.component.html",
  styleUrls: ["./rental-homes.component.scss"],
})
export class RentalHomesComponent implements OnInit {
  city: string;
  rentals: Rental[] = [];
  isFetching = false;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.city = params.get("city");
      this.getRentals();
    });
  }

  getRentals() {
    this.isFetching = true;
    this.rentalService.getRentalsByCity(this.city).subscribe((rentals) => {
      this.rentals = rentals;
      this.isFetching = false;
    });
  }
}
