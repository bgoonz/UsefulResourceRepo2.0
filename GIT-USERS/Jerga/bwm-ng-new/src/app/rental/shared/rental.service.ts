import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Rental } from "./rental.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { exctractApiError } from "src/app/shared/helpers/functions";

@Injectable({
  providedIn: "root",
})
export class RentalService {
  constructor(private http: HttpClient) {}

  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(`/api/v1/rentals/${rentalId}`);
  }

  // generic types TODO: Explain in next lecture
  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/api/v1/rentals`);
  }

  getAuthUserRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/api/v1/rentals/me`);
  }

  getRentalsByCity(city: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/api/v1/rentals?city=${city}`);
  }

  createRental(newRental: Rental): Observable<Rental> {
    return this.http
      .post<Rental>("/api/v1/rentals", newRental)
      .pipe(
        catchError((resError: HttpErrorResponse) =>
          throwError(exctractApiError(resError))
        )
      );
  }

  verifyRentalOwner(rentalId: string): Observable<any> {
    return this.http.get(`/api/v1/rentals/${rentalId}/verify-user`);
  }

  updateRental(rentalId: string, rental: Rental): Observable<Rental> {
    return this.http.patch<Rental>(`/api/v1/rentals/${rentalId}`, rental);
  }

  deleteRental(rentalId: string): Observable<any> {
    return this.http.delete(`/api/v1/rentals/${rentalId}`);
  }
}
