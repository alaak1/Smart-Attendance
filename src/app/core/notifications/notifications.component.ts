import { Component, OnInit } from '@angular/core';
import { Notification } from '../../notification';
import { NotificationService } from '../../notification.service';
import { UserService } from '../../user.service';
import { IUserCredentials } from '../../User.module';
import { AttendanceService } from '../../attendaceRecord.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
    trigger('slideOut', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('* => void', [
        animate('0.5s ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  user: IUserCredentials | null = null;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    if (this.user) {
      const recipient_id = this.user.id;
      this.notificationService.getNotifications(recipient_id).subscribe(
        notifications => {
          this.notifications = notifications;
        },
        error => {
          console.error('Error fetching notifications:', error);
        }
      );
    }
  }

  downloadFile(filename: string): void {
    this.notificationService.downloadFile(filename).subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }

  updateAttendance(notification: Notification, status: string): void {
    this.attendanceService.updateAttendance(notification.sender_id, notification.course_id, notification.date_sent, status).subscribe(
      response => {
        console.log('Attendance updated successfully', response);
        this.deleteNotification(notification.notification_id);
      },
      error => {
        console.error('Error updating attendance:', error);
      }
    );
    // this.deleteNotification(notification.notification_id);
  }

  deleteNotification(notificationId: string): void {
    setTimeout(() => {
      this.notificationService.deleteNotification(notificationId).subscribe(
        response => {
          console.log('Notification deleted successfully', response);
          this.notifications = this.notifications.filter(notification => notification.notification_id !== notificationId);
        },
        error => {
          console.error('Error deleting notification:', error);
        }
      );
    }, 500);
  }
}
