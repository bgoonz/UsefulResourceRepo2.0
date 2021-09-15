import { Component, OnInit } from "@angular/core";
import { RentalService } from "src/app/services/rental.service";
import { Rental } from "src/app/models/rental.model";

@Component({
  selector: "app-rental-list",
  templateUrl: "./rental-list.component.html",
  styleUrls: ["./rental-list.component.scss"],
})
export class RentalListComponent implements OnInit {
  constructor(private rentalService: RentalService) {}
  // get this rentals then input it into the rental-list-item
  // use the html *ngFor let rental of rentals
  // then [childRental] = 'rental' then we use it
  // inside the html of the childRental (list-item.html)
  rentals: Rental[] = [];

  testVariable: string = "";

  ngOnInit() {
    const testNumber: number = 23;

    const rentalObservable = this.rentalService.getRentals();

    rentalObservable.subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (error) => {},

      () => {}
    );
  }
}
