import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {faMapLocationDot, faPhoneVolume, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import {faTaxi} from "@fortawesome/free-solid-svg-icons/faTaxi";
import {CardServiceComponent} from "./card-service/card-service.component";
import {NoticesComponent} from "./notices/notices.component";
import {faMailForward} from "@fortawesome/free-solid-svg-icons/faMailForward";
import {ReservationApproachComponent} from "./reservation-approach/reservation-approach.component";
import {TitleComponent} from "../../shared/components/title/title.component";
import {PositionEnum} from "../../core/models/enum/position.enum";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FaIconComponent,
    CardServiceComponent,
    NoticesComponent,
    ReservationApproachComponent,
    TitleComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  protected readonly faArrowRight = faArrowRight;
  protected readonly faPhoneVolume = faPhoneVolume;
  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faPlaneDeparture = faPlaneDeparture;
  protected readonly faTaxi = faTaxi;
  protected readonly faMailForward = faMailForward;
  protected readonly PositionEnum = PositionEnum;
}
