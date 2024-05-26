import { Component } from '@angular/core';
import {NoticeComponent} from "./notice/notice.component";

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [
    NoticeComponent
  ],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent {

}
