import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from "../../course";


@Injectable({
  providedIn: 'root'
})
export class studentService {
  private apiUrl = 'https://backend-files-for-attendance.vercel.app/api/student-courses'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getCourses(student_id: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/${student_id}`);
  }
}
