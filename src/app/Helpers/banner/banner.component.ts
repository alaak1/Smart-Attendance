import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import {IUserCredentials} from "../../User.module";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit{

  userRole: string | null = null;

  constructor(private router: Router, private userService: UserService) {}
  signout(){
    this.router.navigate(['log-in']);
    this.userService.clearUser();
  }


  ngOnInit(): void {

    const user: IUserCredentials | null = this.userService.getUser();
    if (user) {
      this.userRole = user.role ?? null;
    }
  }
}
