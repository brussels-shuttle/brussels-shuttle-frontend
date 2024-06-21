import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {CreateBookingPageComponent} from "./pages/create-booking-page/create-booking-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'create-booking',
    component: CreateBookingPageComponent
  },
];
