import {Component, Input, signal, WritableSignal} from '@angular/core';
import {JourneyQuote} from "../../../../core/models/journey-quote";
import {JsonPipe} from "@angular/common";
import {VehicleModelPriceComponent} from "./vehicle-model-price/vehicle-model-price.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-journey-quote',
  standalone: true,
  imports: [
    JsonPipe,
    VehicleModelPriceComponent
  ],
  templateUrl: './journey-quote.component.html',
  styleUrl: './journey-quote.component.css'
})
export class JourneyQuoteComponent {

  private _journeyQuote: WritableSignal<JourneyQuote | null> = signal(null);

  @Input()
  vehicleModelIdForm: FormControl = new FormControl();

  @Input() passengerCount: number = 1;

  @Input() set journeyQuote(journeyQuote: JourneyQuote) {
    this._journeyQuote.set(journeyQuote);
  }

  get journeyQuote(): WritableSignal<JourneyQuote | null> {
    return this._journeyQuote;
  }

}
