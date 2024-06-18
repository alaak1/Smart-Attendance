import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
  private apiUrl = `http://192.168.1.40:3000/api/qr`;

  constructor(private http: HttpClient) {}

  generatePasscode(course_id: string, validity_period: number, date: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate/${course_id}`, { validity_period, date });
  }

  updateAttendance(student_id: string, course_id: string, date: string, passcode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/scan`, { student_id, course_id, date, passcode });
  }
}
