import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {IUserCredentials} from "../../../User.module";
import {UserService} from "../../../user.service";
import {AttendanceService} from "../../../attendaceRecord.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Course} from "../../../course";

interface AttendanceRecord {
  date: string;
  status: string;
}

interface StudentAttendance {
  student_id: string;
  name: string;
  absent_count: string;
  attendances: AttendanceRecord[];
  [key: string]: any; // To allow dynamic keys for dates
}

@Component({
  selector: 'app-student-record',
  templateUrl: './student-record.component.html',
  styleUrl: './student-record.component.css'
})
export class StudentRecordComponent implements OnInit {
  displayedColumns: string[] = ['student_id', 'name', 'absent_days'];
  dataSource: StudentAttendance[] = [];
  user: IUserCredentials | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public course: Course,
    private userService: UserService,
    private attendanceService: AttendanceService,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.fetchAttendanceRecords();
  }

  getRowClass(element: any): string {
    const index = this.dataSource.indexOf(element);
    return index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-300';
  }

  getAbsentDaysClass(absentCount: number): string {
    if (absentCount < 5) {
      return 'green';
    } else if (absentCount === 5) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  fetchAttendanceRecords(): void {
    if (this.course && this.course.course_id) {
      this.attendanceService.getAttendances(this.course.lecturer_id, this.course.course_id).subscribe(
        attendances => {
          this.transformAttendanceData(attendances);
        },
        error => {
          console.error('Error fetching attendances:', error);
        }
      );
    }
  }

  transformAttendanceData(attendances: StudentAttendance[]): void {
    // Filter data to only include records where user.id === student_id
    const filteredAttendances = attendances.filter(att => att.student_id === this.user?.id);

    const transformedData: StudentAttendance[] = filteredAttendances.map(att => {
      const record: any = {
        student_id: att.student_id,
        name: att.name,
        absent_count: att.absent_count // Ensure absent_days is included
      };

      att.attendances.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).forEach(a => {
        record[a.date] = a.status;
      });

      return record;
    });

    // Reset displayedColumns to avoid duplicates
    const staticColumns = ['student_id', 'name', 'absent_days'];
    const dateColumns = transformedData.reduce((columns, record) => {
      Object.keys(record).forEach(key => {
        if (key.includes('/') && !columns.includes(key)) {
          columns.push(key);
        }
      });
      return columns;
    }, [] as string[]).sort();
    this.displayedColumns = [...staticColumns, ...dateColumns];
    this.dataSource = transformedData;
    this.cdr.detectChanges(); // Notify Angular of the changes
  }
}
