import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "src/app/services/rental.service";
import { Rental } from "src/app/models/rental.model";
import { Review } from "../../../models/review.model";
import { ReviewService } from "../../../services/review.service";
import * as moment from "moment";
@Component({
  selector: "app-rental-detail",
  templateUrl: "./rental-detail.component.html",
  styleUrls: ["./rental-detail.component.scss"],
})
export class RentalDetailComponent implements OnInit {
  currentId: string;
  rental: Rental;
  rating: number;
  reviews: Review[] = [];
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    // get the id
    this.route.params.subscribe((params) => {
      // console.log(params);
      this.getRental(params["rentalId"]);
    });
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental) => {
      this.rental = rental;
      this.getReviews(rental._id);
    });
  }

  getReviews(rentalId: string) {
    this.reviewService.getRentalReviews(rentalId).subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
        this.getOverallRating(this.rental._id);
      },
      () => {}
    );
  }

  formatDate(date: string): string {
    return `${moment(date).fromNow()}`;
  }

  getOverallRating(rentalId: string) {
    this.reviewService.getOverallRating(rentalId).subscribe((rating) => {
      this.rating = Math.round(rating * 10) / 10;
    });
  }
}
