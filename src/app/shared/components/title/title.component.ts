import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {PositionEnum} from "../../../core/models/enum/position.enum";

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  @Input() shortTitle: string | undefined;
  @Input() title: string | undefined;
  @Input() subTitle: string | undefined;
  @Input() description: string | undefined;
  @Input() position: PositionEnum = PositionEnum.Center;
  protected readonly PositionEnum = PositionEnum;
}
