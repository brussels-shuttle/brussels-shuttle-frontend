import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {MatStepperModule,} from "@angular/material/stepper";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BookingDetailsComponent} from "./booking-details/booking-details.component";
import {GoogleMap} from "@angular/google-maps";
import {PlaceAutocompleteComponent} from "../../../shared/components/place-auto-complete/place-auto-complete.component";
import {TuiInputDateModule, TuiInputModule, TuiInputTimeModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/core";
import {JsonPipe} from "@angular/common";
import {GoogleMapComponent} from "../../../shared/components/google-map/google-map.component";
import {dateMinTomorrowValidator, timeValidator} from "../../../shared/services/custom-validator";
import {JourneyQuoteGateway} from "../../../core/ports/journey-quote.gateway";
import {JourneyQuoteRequest} from "../../../core/models/journey-quote-request";
import {map} from "rxjs";
import {JourneyQuote, VehicleModelPrice} from "../../../core/models/journey-quote";
import {JourneyQuoteComponent} from "./journey-quote/journey-quote.component";
import {VehicleModelPriceComponent} from "./journey-quote/vehicle-model-price/vehicle-model-price.component";

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BookingDetailsComponent,
    GoogleMap,
    PlaceAutocompleteComponent,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputTimeModule,
    TuiButtonModule,
    JsonPipe,
    GoogleMapComponent,
    JourneyQuoteComponent,
    VehicleModelPriceComponent,
  ],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent implements OnInit {
  private _formBuilder= inject(FormBuilder);
  private journeyQuoteGateway = inject(JourneyQuoteGateway);

  private _journeyQuote: WritableSignal<JourneyQuote | null> = signal(null);
  private _bookingFormGroup = this._formBuilder.group({
    bookingDetails: new FormGroup({
      startTime: new FormGroup({
        date: new FormControl(null, [Validators.required, dateMinTomorrowValidator()]),
        time: new FormControl(null, [Validators.required, timeValidator()]),
      }),
      startAddress: new FormGroup({
        address: new FormControl('', [Validators.required, Validators.minLength(3)]),
        place: new FormControl('', [Validators.required]),
      }),
      endAddress: new FormGroup({
        address: new FormControl('', [Validators.required, Validators.minLength(3)]),
        place: new FormControl('', [Validators.required]),
      }),
      passengerCount: new FormControl(1,  [Validators.required, Validators.min(1), Validators.max(9)])
    }),
    vehicleModelId: new FormControl(null, [Validators.required]),
  });

  get bookingDetailsFormGroup() {
    return this._bookingFormGroup.get('bookingDetails') as FormGroup;  }

  get startTime(): FormGroup {
    return this._bookingFormGroup.get('bookingDetails.startTime') as FormGroup;
  }

  get startAddress(): FormGroup {
    return this._bookingFormGroup.get('bookingDetails.startAddress') as FormGroup;
  }

  get placeStartAddress(): FormControl {
    return this.startAddress.get('place') as FormControl;
  }

  get placeEndAddress(): FormControl {
    return this.endAddress.get('place') as FormControl;
  }

  get endAddress(): FormGroup {
    return this._bookingFormGroup.get('bookingDetails.endAddress') as FormGroup;
  }

  get passengerCount(): FormControl {
    return this._bookingFormGroup.get('bookingDetails.passengerCount') as FormControl;
  }

  get vehicleModelId(): FormControl {
    return this._bookingFormGroup.get('vehicleModelId') as FormControl;
  }

  get areAllControlsValid(): boolean {
    return !this._bookingFormGroup.invalid;
  }

  get journeyQuote(): JourneyQuote | null {
    return this._journeyQuote();
  }

  vehicleModelPrice() {
    const result: VehicleModelPrice = {
      vehicleModel:   {
        "id": 1,
        "name": "Eco",
        "type": "SEDAN",
        "imageUrl": "https://i.postimg.cc/gjqxSGwg/Business.png",
        "passengerCapacity": 4,
        "luggageCapacity": 4
      },
      price: 100
    }
    return result;
  }


  searchJourneyQuote() {
    if (this.bookingDetailsFormGroup.invalid) {
      return;
    }
    const request: JourneyQuoteRequest = {
      startAddress: this.startAddress.value.place,
      endAddress:  this.endAddress.value.place,
      startTime: undefined
    }
    this.journeyQuoteGateway.computeJourneyQuotesForAllModels(request).pipe(
      map(journeyQuote => {
        this._journeyQuote.set(journeyQuote)
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.bookingDetailsFormGroup.valueChanges.subscribe(() => {
      if(this.bookingDetailsFormGroup.invalid) {
        this._journeyQuote.set(null);
      }
    });
  }
}
