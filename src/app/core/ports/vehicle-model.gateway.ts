import {Observable} from "rxjs";
import {VehicleModel} from "../models/vehicle-model";

export abstract class VehicleModelGateway {
  abstract getAllVehicleModels(): Observable<VehicleModel[]>;
}
