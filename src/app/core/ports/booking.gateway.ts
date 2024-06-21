import {Booking} from "../models/booking";
import {Observable} from "rxjs";

export abstract class BookingGateway {
  abstract createBooking(booking: Booking): Observable<any>;
}
