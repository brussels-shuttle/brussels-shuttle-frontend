import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input, NgZone, OnDestroy,
  OnInit,
  Output, Renderer2,
  ViewChild
} from '@angular/core';
import {TuiInputDateModule, TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {debounceTime, Observable, Observer, switchMap} from "rxjs";
import {GooglePlacesGateway} from "../../../core/adapters/google-places.gateway";
import {MatFormField, MatInput} from "@angular/material/input";
import {Address} from "../../../core/models/address";
import {tuiIconHeartLarge} from "@taiga-ui/icons";
import {GooglePlacesDirective} from "../../directives/google-places.directive";
import {PlaceAddress} from "../../../core/models/PlaceAddress";
import {matDialogAnimations} from "@angular/material/dialog";

@Component({
  selector: 'app-place-auto-complete',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    FormsModule,
    MatInput,
    MatFormField,
    TuiInputDateModule,
    GooglePlacesDirective
  ],
  templateUrl: './place-auto-complete.component.html',
  styleUrl: './place-auto-complete.component.css'
})
export class PlaceAutocompleteComponent implements OnInit {

  @Input() addressForm: FormGroup = new FormGroup({});
  @Input() label = 'Destination';
  @Input() icon = 'tuiIconMapPinLarge';

  @Output() placeChanged = new EventEmitter<PlaceAddress>();

  constructor() {}

  ngOnInit() {
    this.inputAddress.valueChanges.subscribe((value: string) => {
      if (!value) {
        this.placeAddress.setValue(undefined);
      }
    });
  }

  get placeAddress(): FormControl {
    return this.addressForm.get('place') as FormControl;
  }

  get inputAddress(): FormControl {
    return this.addressForm.get('address') as FormControl;
  }

  onPlaceChanged($event: PlaceAddress) {
    this.placeAddress.setValue($event);
    this.placeChanged.emit($event);
  }

}
