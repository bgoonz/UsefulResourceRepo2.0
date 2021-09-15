import { Component, OnInit } from "@angular/core";
import { Rental } from "src/app/models/rental.model";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "src/app/services/rental.service";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { UcWordsPipe } from "ngx-pipes";

@Component({
  selector: "app-rental-update",
  templateUrl: "./rental-update.component.html",
  styleUrls: ["./rental-update.component.scss"],
})
export class RentalUpdateComponent implements OnInit {
  currentId: string;
  rental: Rental;

  locationSubject: Subject<any> = new Subject();

  rentalCategories: string[] = Rental.CATEGORIES;
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private toastr: ToastrService,
    private upperPipe: UcWordsPipe
  ) {
    this.transformLocation = this.transformLocation.bind(this);
  }

  ngOnInit() {
    // get the id
    this.route.params.subscribe((params) => {
      // console.log(params);
      this.getRental(params["rentalId"]);
    });
  }

  transformLocation(location: string): string {
    return this.upperPipe.transform(location);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental) => {
      this.rental = rental;
    });
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updateRental: Rental) => {
        this.rental = updateRental;

        if (rentalData.city || rentalData.street) {
          this.locationSubject.next(
            this.rental.city + "," + this.rental.street
          );
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.err[0].detail, "Error");
        this.getRental(rentalId);
      }
    );
  }

  countBedroomAssets(assetsNum: number) {
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetsNum;
  }
}
