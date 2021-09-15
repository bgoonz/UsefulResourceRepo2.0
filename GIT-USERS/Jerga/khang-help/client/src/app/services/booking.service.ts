import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Booking } from "../models/booking.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private readonly rootURL = "http://localhost:3001/api/bookings";
  constructor(private httpClient: HttpClient) {}

  public createBooking(booking: Booking): Observable<any> {
    return this.httpClient.post(this.rootURL, booking);
  }

  public getUserBookings(): Observable<any> {
    return this.httpClient.get(this.rootURL + "/manage");
  }
}
