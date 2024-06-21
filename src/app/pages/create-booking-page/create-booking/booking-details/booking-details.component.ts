import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputDateTimeModule,
  TuiInputTimeModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {GoogleMap} from "@angular/google-maps";
import {
  PlaceAutocompleteComponent
} from "../../../../shared/components/place-auto-complete/place-auto-complete.component";
import {Address} from "../../../../core/models/address";

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [
    TuiInputDateTimeModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    GoogleMap,
    PlaceAutocompleteComponent,
    TuiInputTimeModule,
    TuiInputDateModule,
    TuiSelectModule,
    TuiDataListWrapperModule
  ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  @Input() startTimeForm: FormGroup = new FormGroup({});
  @Input() startAddressForm: FormGroup = new FormGroup({});
  @Input() endAddressForm: FormGroup = new FormGroup({});

  @Input() passengerCountForm: FormControl = new FormControl();

  private _passengerCountItems: number[] = Array.from({length: 9}, (_, i) => i + 1);

  get passengerCountItems(): number[] {
    return this._passengerCountItems;
  }

  get startTimeDate(): FormControl {
    return this.startTimeForm.get('date') as FormControl;
  }

  get startTimeTime(): FormControl {
    return this.startTimeForm.get('time') as FormControl;
  }
}
