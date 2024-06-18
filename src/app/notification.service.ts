import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from './notification'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://192.168.1.40:3000/api/notifications'; // Adjust the URL as needed
  private fileDownloadUrl = 'http://192.168.1.40:3000/api/files'; // URL for file downloads


  constructor(private http: HttpClient) {}

  getNotifications(recipient_id: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${recipient_id}`);
  }

  createNotification(notification: any, file?: File): Observable<Notification> {
    const formData: FormData = new FormData();
    formData.append('recipient_id', notification.recipient_id);
    formData.append('sender_id', notification.sender_id);
    formData.append('message', notification.message);
    formData.append('date_sent', notification.date_sent);
    formData.append('course_id', notification.course_id);

    if (file) {
      formData.append('file', file);
    }

    return this.http.post<Notification>(this.apiUrl, formData);
  }

  downloadFile(notificationId: string): Observable<Blob> {
    return this.http.get(`${this.fileDownloadUrl}/${notificationId}`, { responseType: 'blob' });
  }

  deleteNotification(notification_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${notification_id}`);
  }
}
