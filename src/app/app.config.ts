import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BookingGateway} from "./core/ports/booking.gateway";
import {JourneyQuoteGateway} from "./core/ports/journey-quote.gateway";
import {VehicleModelGateway} from "./core/ports/vehicle-model.gateway";
import {HttpVehicleModelGateway} from "./core/adapters/http-vehicle-model.gateway";
import {HttpJourneyQuoteGateway} from "./core/adapters/http-journey-quote.gateway";
import {HttpBookingGateway} from "./core/adapters/http-booking.gateway";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from "@angular/material/form-field";
import {GoogleMapsModule} from "@angular/google-maps";

export const provideTranslation = () => ({
  defaultLanguage: 'fr',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export function HttpLoaderFactory(http: HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([
        TuiRootModule,
        TranslateModule.forRoot(provideTranslation()),
      ]
    ),
    { provide: BookingGateway, useFactory: () => new HttpBookingGateway() },
    { provide: JourneyQuoteGateway, useFactory: () => new HttpJourneyQuoteGateway() },
    { provide: VehicleModelGateway, useFactory: () => new HttpVehicleModelGateway() }, provideAnimationsAsync(),
  ]
};
