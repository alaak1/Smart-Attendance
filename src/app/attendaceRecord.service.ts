// src/app/attendance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AttendanceRecord {
  date: string;
  status: string;
}

interface StudentAttendance {
  student_id: string;
  name: string;
  absent_count: string;
  attendances: AttendanceRecord[];
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'https://backend-files-for-attendance.vercel.app/api/lecturer-course-attendance'; 

  constructor(private http: HttpClient) {}

  getAttendances(lecturer_id: string, course_id: string): Observable<StudentAttendance[]> {
    return this.http.get<StudentAttendance[]>(`${this.apiUrl}/${lecturer_id}/${course_id}`);
  }


  updateAttendance(student_id: string, course_id: string, date: string, status: string): Observable<any> {
    const updateData = { student_id, course_id, date, status };
    return this.http.put('https://backend-files-for-attendance.vercel.app/api/attendances', updateData);
  }
}
