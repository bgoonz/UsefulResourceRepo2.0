import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Review } from "../models/review.model";

@Injectable()
export class ReviewService {
  constructor(private httpClient: HttpClient) {}
  private readonly rootURL = "http://localhost:3001/api/reviews";

  public createReview(review: Review, bookingId: string): Observable<any> {
    return this.httpClient.post(
      this.rootURL + `?bookingId=${bookingId}`,
      review
    );
  }

  public getRentalReviews(rentalId: string): Observable<any> {
    return this.httpClient.get(this.rootURL + `?rentalId=${rentalId}`);
  }

  public getOverallRating(rentalId: string): Observable<any> {
    return this.httpClient.get(this.rootURL + `/${rentalId}/rating`);
  }
}
