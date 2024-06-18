import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from "../../course";


@Injectable({
  providedIn: 'root'
})
export class studentService {
  private apiUrl = 'http://192.168.1.40:3000/api/student-courses'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getCourses(student_id: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/${student_id}`);
  }
}
