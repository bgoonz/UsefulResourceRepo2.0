import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { exctractApiError } from "src/app/shared/helpers/functions";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getBookings(rentalId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`/api/v1/bookings?rental=${rentalId}`);
  }

  getAuthUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`/api/v1/bookings/me`);
  }

  getReceivedBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`/api/v1/bookings/received`);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http
      .post<Booking>("/api/v1/bookings", booking)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          throwError(exctractApiError(error))
        )
      );
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`/api/v1/bookings/${bookingId}`);
  }
}
