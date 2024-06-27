import {VehicleModel} from "./vehicle-model";
import {Address} from "node:cluster";

export interface JourneyQuote {
  id: number;
  startAddress: Address;
  endAddress: Address;
  distanceInKilometers: number;
  durationInSeconds: number;
  expirationTime: Date;
  vehicleModelPrices: VehicleModelPrice[];
}

export interface VehicleModelPrice {
  vehicleModel: VehicleModel;
  price: number;

}
