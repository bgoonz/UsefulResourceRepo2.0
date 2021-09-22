import { Component, OnInit } from "@angular/core";
import { Rental } from "src/app/rental/shared/rental.model";
import { RentalService } from "src/app/rental/shared/rental.service";

@Component({
  selector: "bwm-manage-rentals",
  templateUrl: "./manage-rentals.component.html",
  styleUrls: ["./manage-rentals.component.scss"],
})
export class ManageRentalsComponent implements OnInit {
  rentals: Rental[];

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    this.rentalService.getAuthUserRentals().subscribe((rentals: Rental[]) => {
      this.rentals = rentals;
    });
  }

  deleteRental(rentalId: string) {
    const canDelete = this.askForPermission();
    if (!canDelete) {
      return;
    }

    this.rentalService.deleteRental(rentalId).subscribe(
      (_) => {
        const index = this.rentals.findIndex((r) => r._id === rentalId);
        this.rentals.splice(index, 1);

        alert("Rental has been deleted!");
      },
      (_) => alert("Rental cannot be deleted!")
    );
  }

  private askForPermission(): boolean {
    return window.confirm("Are you sure you want to delete rental?");
  }
}
