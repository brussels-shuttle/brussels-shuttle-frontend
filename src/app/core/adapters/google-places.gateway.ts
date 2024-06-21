import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesGateway{
  http = inject(HttpClient);

  private readonly GOOGLE_API_URL = 'https://places.googleapis.com/v1/places:autocomplete';
  private readonly GOOGLE_API_URL_DETAILS = 'https://places.googleapis.com/places/details/json';


  private readonly headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': 'AIzaSyCB-aHPr8m6okbQbxfaNvm2Druxe8R_Ga4'
  };

  getPlacesAutoComplete(input: string){
    const body = {
      input: input,
    };
    return this.http.post<any>(this.GOOGLE_API_URL, body, { headers: this.headers });
  }

  getPlaceDetails(placeId: string){
    const url = `${this.GOOGLE_API_URL_DETAILS}?fields=name,rating,formatted_phone_number&place_id=${placeId}&key=${this.headers['X-Goog-Api-Key']}`;
    return this.http.get<any>(url);  }
}
