import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.css'
})
export class NoticeComponent {
@Input() name: string = '';
@Input() description: string = '';
@Input() direction?: string = '';
@Input() profileSrc?: string = '';
}
