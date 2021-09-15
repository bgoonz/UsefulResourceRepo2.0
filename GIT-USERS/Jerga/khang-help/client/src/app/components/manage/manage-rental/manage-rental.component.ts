import { Component, OnInit } from "@angular/core";
import { RentalService } from "src/app/services/rental.service";
import { Rental } from "src/app/models/rental.model";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-manage-rental",
  templateUrl: "./manage-rental.component.html",
  styleUrls: ["./manage-rental.component.scss"],
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];
  rentalDeleteIndex: number;
  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      () => {}
    );
  }

  onDeleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        this.rentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
        this.toastr.error("Rental has successfully deleted!", "Deleted !");
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.err[0].detail, "Failed!");
      }
    );
  }
}
