import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeService } from '../../../qr-code.service';
import { FeedbackPopupComponent } from '../../../Helpers/feedback-popup/feedback-popup.component';

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements OnInit {
  passcode = '';
  course_id = '';
  date = '';

  updateForm = new FormGroup({
    student_id: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private qrCodeService: QrCodeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.passcode = this.route.snapshot.queryParamMap.get('passcode') || '';
    this.course_id = this.route.snapshot.queryParamMap.get('course_id') || '';
    this.date = this.route.snapshot.queryParamMap.get('date') || '';
  }

  submit() {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      if (formData && formData.student_id) {
        this.qrCodeService.updateAttendance(formData.student_id, this.course_id, this.date, this.passcode).subscribe(
          response => {
            this.dialog.open(FeedbackPopupComponent, {
              data: { message: 'Excuse has been sent successfully!' }
            });
          },
          error => {
            console.error('Submission failed', error);
          }
        );
      }
    }
  }
}
