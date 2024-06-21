import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { IUserCredentials } from "../../User.module";
import { NotificationService } from "../../notification.service";
import { Notification } from "../../notification";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {
  user: IUserCredentials | null = null;
  notifications: Notification[] = [];
  userRole: string | null = null;

  constructor(private router: Router,
              private userService: UserService,
              private notificationService: NotificationService) {}

  signout() {
    this.router.navigate(['log-in']);
    this.userService.clearUser();
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    const user: IUserCredentials | null = this.userService.getUser();
    if (user) {
      this.userRole = user.role ?? null;
    }
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
}
