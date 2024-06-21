import {Component, signal, WritableSignal} from '@angular/core';
import {MatStepperModule,} from "@angular/material/stepper";
import {inject} from "@angular/core";
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
import {JourneyQuote} from "../../../core/models/journey-quote";
import {JourneyQuoteComponent} from "./journey-quote/journey-quote.component";

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
  ],
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css'
})
export class CreateBookingComponent {
  private _formBuilder= inject(FormBuilder);
  private journeyQuoteGateway = inject(JourneyQuoteGateway);

  private _journeyQuote: WritableSignal<JourneyQuote | null> = signal(null);
  private _bookingDetailsFormGroup = this._formBuilder.group({
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
    passengerCount: [1,  [Validators.required, Validators.min(1), Validators.max(9)]],
    // vehicleModel: new FormControl(null, [Validators.required]),
  });

  get bookingDetailsFormGroup() {
    return this._bookingDetailsFormGroup;
  }

  get startTime(): FormGroup {
    return this._bookingDetailsFormGroup.get('startTime') as FormGroup;
  }

  get startAddress(): FormGroup {
    return this._bookingDetailsFormGroup.get('startAddress') as FormGroup;
  }

  get placeStartAddress(): FormControl {
    return this.startAddress.get('place') as FormControl;
  }

  get placeEndAddress(): FormControl {
    return this.endAddress.get('place') as FormControl;
  }

  get endAddress(): FormGroup {
    return this._bookingDetailsFormGroup.get('endAddress') as FormGroup;
  }

  get passengerCount(): FormControl {
    return this._bookingDetailsFormGroup.get('passengerCount') as FormControl;
  }

  get areAllControlsValid(): boolean {
    return !this._bookingDetailsFormGroup.invalid;
  }

  get journeyQuote(): JourneyQuote | null {
    return this._journeyQuote();
  }


  searchJourneyQuote() {
    if (this._bookingDetailsFormGroup.invalid) {
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
}
