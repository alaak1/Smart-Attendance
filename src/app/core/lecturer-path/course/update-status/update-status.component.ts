import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AttendanceService} from "../../../../attendaceRecord.service";
import {FeedbackPopupComponent} from "../../../../Helpers/feedback-popup/feedback-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {
  course_id: string = '';
  courseName ='';
  courseCode ='';

  updateStatusForm = new FormGroup({
    student_id: new FormControl('', Validators.required),
    course_id: new FormControl({ value: '', disabled: true }, Validators.required),
    date: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attendanceService: AttendanceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
    const course_name = this.route.snapshot.paramMap.get('name');
    const course_code = this.route.snapshot.paramMap.get('code');

    if (idParam !== null && course_name !==null && course_code !== null) {
      this.course_id = idParam;
      this.courseName = course_name;
      this.courseCode = course_code;
    } else {
      console.error('Invalid route parameters');
    }
  }

  updateStatus(): void {
    const { student_id, date, status } = this.updateStatusForm.getRawValue();
    if (this.course_id && student_id && date && status) {
      const formattedDate = this.formatDateString(date);
      this.attendanceService.updateAttendance(student_id, this.course_id, formattedDate, status).subscribe(response => {
        this.dialog.open(FeedbackPopupComponent, {
          data: { message: 'Status has been updated successfully!' }
        });
        this.router.navigate([`lecturer-dashboard/course/${this.course_id}/${this.courseName}/${this.courseCode}`]);
      });
    } else {
      console.error('Course ID is missing');
    }
  }

  cancel(): void {
    if (this.course_id) {
      this.router.navigate([`lecturer-dashboard/course/${this.course_id}/${this.courseName}/${this.courseCode}`]);
    } else {
      console.error('Course ID is missing');
    }
  }

  private formatDateString(date: string | null): string {
    if (!date) {
      return '';
    }
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
}
