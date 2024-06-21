import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {VehicleModel} from "../models/vehicle-model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpVehicleModelGateway {
  http = inject(HttpClient);

  VEHICLE_MODEL_URL = '/public/vehicle-model/';

  getAllVehicleModels(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(environment.baseUrl + this.VEHICLE_MODEL_URL).pipe(
      map(vehicleModels => vehicleModels.map(vehicleModel => ({
        ...vehicleModel,
      })))
    );
  }
}
