import {Observable} from "rxjs";

export abstract class PlacesGateway {
  abstract searchPlaces(query: string): Observable<string[]>;
  abstract getPlaceDetails(placeId: string): Observable<string>;
}
