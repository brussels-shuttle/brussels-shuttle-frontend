import {VehicleModel} from "./vehicle-model";
import {Address} from "node:cluster";

export interface JourneyQuote {
  startAddress: Address;
  endAddress: Address;
  distanceInKilometers: number;
  durationInSeconds: number;
  vehicleModelPrices: VehicleModelPrice[];
}

export interface VehicleModelPrice {
  VehicleModel: VehicleModel;
  price: number;

}
