import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../../../course';
import { UserService } from '../../../user.service';
import { IUserCredentials } from '../../../User.module';
import { studentService } from '../student.service';
import { NotificationService } from '../../../notification.service';
import {MatDialog} from "@angular/material/dialog";
import {FeedbackPopupComponent} from "../../../Helpers/feedback-popup/feedback-popup.component";

@Component({
  selector: 'app-excuse-page',
  templateUrl: './excuse-page.component.html',
  styleUrls: ['./excuse-page.component.css']
})
export class ExcusePageComponent implements OnInit {
  selectedFile: File | null = null;
  user: IUserCredentials | null = null;
  courses: Course[] = [];

  excuseForm = new FormGroup({
    course_id: new FormControl('', [Validators.required]),
    date: new FormControl('', Validators.required),
    reason: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private studentService: studentService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user && this.user.id) {
      this.studentService.getCourses(this.user.id).subscribe(
        courses => {
          this.courses = courses;
        },
        error => {
          console.error('Error fetching courses:', error);
        }
      );
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.selectedFile = target.files[0] ?? null;
    } else {
      this.selectedFile = null;
    }
  }

  sendExcuse() {
    if (this.excuseForm.valid) {
      const selectedCourse = this.courses.find(course => course.course_id === this.excuseForm.get('course_id')?.value);
      const recipient_id = selectedCourse?.lecturer_id || '';
      const sender_id = this.user?.id || '';
      const comments = this.excuseForm.get('reason')?.value;
      const course_id = this.excuseForm.get('course_id')?.value;

      const dateControl = this.excuseForm.get('date');
      let dateSent = '';
      if (dateControl && dateControl.value) {
        const dateValue = dateControl.value;
        const date = new Date(dateValue);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        dateSent = `${year}/${month}/${day}`;
      }

      const notification = {
        recipient_id,
        sender_id,
        message: comments,
        date_sent: dateSent,
        course_id
      };

      if (this.selectedFile) {
        this.notificationService.createNotification(notification, this.selectedFile).subscribe(
          response => {
            console.log('Notification created:', response);
            this.router.navigate(['student-dashboard']);
            this.dialog.open(FeedbackPopupComponent, {
              data: { message: 'Excuse has been sent successfully!' }
            });
          },
          error => {
            console.error('Error creating notification:', error);
          }
        );


      } else {
        this.notificationService.createNotification(notification).subscribe(
          response => {
            console.log('Notification created:', response);
            this.router.navigate(['student-dashboard']);
          },
          error => {
            console.error('Error creating notification:', error);
          }
        );
      }
    }
  }

  cancel(): void {
      this.router.navigate([`/student-dashboard/`]);
  }
}
