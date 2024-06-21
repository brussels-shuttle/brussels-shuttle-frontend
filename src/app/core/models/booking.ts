import {Passenger} from "./passenger";
import {VehicleModel} from "./vehicle-model";
import {PlaceAddress} from "./PlaceAddress";

export interface Booking {
  id: number;
  passenger: Passenger;
  passengerCount: number;
  bookingStartTime: Date;
  startAddress: PlaceAddress;
  endAddress: PlaceAddress;
  vehicleModel: VehicleModel;
  flightNumber: string;
}
