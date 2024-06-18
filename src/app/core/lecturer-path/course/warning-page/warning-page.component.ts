import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserCredentials } from '../../../../User.module';
import { UserService } from '../../../../user.service';
import { NotificationService } from '../../../../notification.service';
import {MatDialog} from "@angular/material/dialog";
import {FeedbackPopupComponent} from "../../../../Helpers/feedback-popup/feedback-popup.component";

@Component({
  selector: 'app-warning-page',
  templateUrl: './warning-page.component.html',
  styleUrls: ['./warning-page.component.css']
})
export class WarningPageComponent implements OnInit {
  course_id: string = '';
  user: IUserCredentials | null = null;

  warningForm = new FormGroup({
    id: new FormControl('', Validators.required),
    comments: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.course_id = this.route.snapshot.paramMap.get('id') || '';

    // Retrieve the query parameters
    this.route.queryParams.subscribe(params => {
      if (params['student_id'] && params['absent_days']) {
        this.warningForm.patchValue({
          id: params['student_id'],
          comments: `The student has been absent for ${params['absent_days']} days.`
        });
      }
    });
  }

  sendWarning() {
    if (this.warningForm.valid) {
      const recipient_id = this.warningForm.get('id')?.value;
      const comments = this.warningForm.get('comments')?.value;
      const sender_id = this.user?.id || '';

      const notification = {
        recipient_id,
        sender_id,
        message: comments,
        date_sent: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
        course_id: this.course_id
      };

      this.notificationService.createNotification(notification).subscribe(
        response => {
          console.log('Notification created:', response);
          this.router.navigate([`lecturer-dashboard/course/${this.course_id}`]);
          this.dialog.open(FeedbackPopupComponent, {
            data: { message: 'Warning has been sent successfully!' }
          });
        },
        error => {
          console.error('Error creating notification:', error);
        }
      );
    }
  }

  cancel(): void {
    if (this.course_id) {
      this.router.navigate([`/lecturer-dashboard/course/${this.course_id}`]);
    } else {
      console.error('Course ID is missing');
    }
  }
}
