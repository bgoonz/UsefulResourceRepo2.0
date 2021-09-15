import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { RentalService } from "../shared/rental.service";
import { Rental } from "../shared/rental.model";
import { PaginatorComponent } from "../../common/components/paginator/paginator.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "bwm-rental-list",
  templateUrl: "./rental-list.component.html",
  styleUrls: ["./rental-list.component.scss"],
})
export class RentalListComponent implements OnInit {
  @ViewChild("paginator") paginator: PaginatorComponent;
  rentals: Rental[] = [];

  public pageSize: number = 5;
  public pageNum: number = 1;
  public rentalCount: number;

  constructor(
    private rentalService: RentalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["pageSize"] && params["pageNum"]) {
        this.pageSize = parseInt(params["pageSize"]);
        this.pageNum = parseInt(params["pageNum"]);
      }
    });

    this.getRentals(this.pageNum);
  }

  getRentals(pageNum: number) {
    this.pageNum = pageNum;
    const rentalObservable = this.rentalService.getRentals({
      pageSize: this.pageSize,
      pageNum: this.pageNum,
    });

    rentalObservable.subscribe(
      (rentalsData: { allDataCount: number; rentals: Rental[] }) => {
        this.rentals = rentalsData.rentals;
        this.rentalCount = rentalsData.allDataCount;
        this.location.go(
          "/rentals",
          `pageNum=${this.pageNum}&pageSize=${this.pageSize}`
        );
      },
      (err) => {},
      () => {}
    );
  }
}
