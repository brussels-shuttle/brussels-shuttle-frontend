import {Component, Input} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faNotdef} from "@fortawesome/free-solid-svg-icons/faNotdef";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-card-service',
  standalone: true,
  imports: [
    FaIconComponent,
    TranslateModule
  ],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.css'
})
export class CardServiceComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon?: IconDefinition;
  protected readonly faNotdef = faNotdef;
}
