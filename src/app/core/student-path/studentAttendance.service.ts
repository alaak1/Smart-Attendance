import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Attendance {
  student_id: string;
  student_name: string;
  attendances: { date: string; status: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://192.168.1.40:3000/api/course-attendance'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getCourseAttendance(course_id: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/${course_id}`);
  }
}
