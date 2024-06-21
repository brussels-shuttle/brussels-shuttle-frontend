import {Address} from "node:cluster";
import {VehicleModel} from "./vehicle-model";

export interface JourneyQuoteRequest {
  startAddress: Address;
  endAddress: Address;
  startTime?: Date;
}
