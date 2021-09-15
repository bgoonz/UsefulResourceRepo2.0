import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rental } from "../models/rental.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RentalService {
  private readonly rootURL = "https://khang-test.herokuapp.com/api/rentals";
  constructor(private httpClient: HttpClient) {}

  public getRentalById(rentalId: string): Observable<any> {
    return this.httpClient.get(this.rootURL + "/" + rentalId);
  }

  private getHeaders() {
    return { "content-type": "application-json" };
  }
  public getRentals(): Observable<any> {
    // we can only use arrow function here because it will bind the outer context
    // to this context. we CAN'T use the function method here because it won't do the same way
    return this.httpClient.get(this.rootURL);
  }

  public getRentalsByCity(city: string): Observable<any> {
    // we can only use arrow function here because it will bind the outer context
    // to this context. we CAN'T use the function method here because it won't do the same way
    return this.httpClient.get(this.rootURL + `?city=${city}`);
  }

  public createRental(rental: Rental): Observable<any> {
    return this.httpClient.post(this.rootURL, rental);
  }

  public getUserRentals(): Observable<any> {
    return this.httpClient.get(this.rootURL + "/manage");
  }

  public deleteRental(rentalId: string): Observable<any> {
    return this.httpClient.delete(this.rootURL + "/" + rentalId);
  }

  public updateRental(rentalId: string, rentalData: any) {
    return this.httpClient.patch(this.rootURL + "/" + rentalId, rentalData);
  }

  public verifyRentalUser(rentalId: string): Observable<any> {
    return this.httpClient.get(this.rootURL + `/${rentalId}/verify-user`);
  }
}
