import {Component, OnInit} from '@angular/core';
import {Course} from "../../course";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import {IUserCredentials} from "../../User.module";
import {studentService} from "./student.service";
import {Attendance, AttendanceService} from "./studentAttendance.service";

@Component({
  selector: 'app-student-path',
  templateUrl: './student-path.component.html',
  styleUrl: './student-path.component.css'
})
export class StudentPathComponent implements OnInit{

  user: IUserCredentials | null = null;
  studentCourses: Course[] = [];
  courseAttendance: { [courseId: string]: number } = {};

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user && this.user.id) {
      this.studentService.getCourses(this.user.id).subscribe(
        courses => {
          this.studentCourses = courses;
          this.fetchAllCourseAttendance();
          console.log(this.courseAttendance);
        },
        error => {
          console.error('Error fetching courses:', error);
        }
      );
    }
  }

  fetchAllCourseAttendance() {
    this.studentCourses.forEach(course => {
      this.attendanceService.getCourseAttendance(course.course_id).subscribe(
        (attendances: Attendance[]) => {
          const studentAttendance = attendances.find(
            attendance => attendance.student_id === this.user?.id
          );
          if (studentAttendance) {
            const absentDays = studentAttendance.attendances.filter(
              attendance => attendance.status === 'absent'
            ).length;
            this.courseAttendance[course.course_id] = absentDays;
          }
        },
        error => {
          console.error('Error fetching attendance records:', error);
        }
      );
    });
  }


  constructor(private studentService : studentService,
              private attendanceService: AttendanceService,
              private router:Router,
              private userService: UserService) {}

  sendExcuse() {
    this.router.navigate(['student-dashboard/excuse']);

  }

  scanQrCode() {
    this.router.navigate(['student-dashboard/scanQR']);

  }
}
