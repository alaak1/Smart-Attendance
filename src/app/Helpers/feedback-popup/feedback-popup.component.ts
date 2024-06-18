import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-feedback-popup',
  templateUrl: './feedback-popup.component.html',
  styleUrl: './feedback-popup.component.css'
})
export class FeedbackPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}
