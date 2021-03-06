import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Booking } from "./booking.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BookingService {
  constructor(private http: HttpClient) {}

  makeBooking(booking: Booking): Observable<any> {
    return this.http.post("/api/v1/bookings", booking);
  }

  getCurrentUserBookings(): Observable<any> {
    return this.http.get("/api/v1/bookings/manage");
  }
}
