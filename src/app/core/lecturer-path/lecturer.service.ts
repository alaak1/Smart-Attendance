import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Course} from "../../course";

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private apiUrl = 'https://backend-files-for-attendance.vercel.app/api'; // Replace with your ngrok URL

  constructor(private http: HttpClient) { }

  getCourses(lecturerId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/lecturer-courses/${lecturerId}`).pipe(
      catchError(error => {
        console.error('Error fetching courses:', error);
        return throwError(error);
      })
    );
  }
}
