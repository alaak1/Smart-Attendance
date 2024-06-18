// src/app/user.service.ts
import { Injectable } from '@angular/core';
import {IUserCredentials} from "./User.module";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'userCredentials';

  setUser(user: IUserCredentials) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): IUserCredentials | null {
    const userJson = sessionStorage.getItem(this.storageKey);
    if (userJson) {
      return JSON.parse(userJson) as IUserCredentials;
    }
    return null;
  }

  clearUser() {
    sessionStorage.removeItem(this.storageKey);
  }
}
