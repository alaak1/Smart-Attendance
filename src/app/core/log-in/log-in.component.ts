// src/app/log-in/log-in.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService} from "../../user.service";
import {IUserCredentials} from "../../User.module";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  logInForm = new FormGroup({
    id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  credentials:IUserCredentials  = { id: '', password: '' };

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit() {}

  logIn() {
    this.credentials.id = this.logInForm.get('id')?.value || '';
    this.credentials.password = this.logInForm.get('password')?.value || '';

    this.http.post<{ role : string , name : string , email : string }>('http://192.168.1.40:3000/api/login', this.credentials).subscribe(
      response => {
        if (response.role) {
          this.credentials.role = response.role;
          this.credentials.name = response.name;
          this.credentials.email = response.email;
          this.userService.setUser(this.credentials); // Store user data in sessionStorage

          if (response.role === 'lecturer') {
            this.router.navigate(['lecturer-dashboard']);
          } else if (response.role === 'student') {
            this.router.navigate(['student-dashboard']);
          }
        } else {
          alert('Invalid credentials');
        }
      },
      error => {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }
}
