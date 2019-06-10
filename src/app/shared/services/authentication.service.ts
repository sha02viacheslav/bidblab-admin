import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../../pages/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private token: string = '';
  private userSubject: BehaviorSubject<any>;

  constructor(private router: Router) {
    // this.token = localStorage.getItem('bidblabA');
    const user = localStorage.getItem('bidblabA') ? jwtDecode(localStorage.getItem('bidblabA')).user : null;
    this.userSubject = new BehaviorSubject<User>(user);
  }

  getToken() {
    return localStorage.getItem('bidblabA');
  }

  setToken(token: string) {
    // this.token = token;
    localStorage.setItem('bidblabA', token);
  }

  // getUser() {
  //   return this.userSubject.getValue();
  // }

  getUserUpdates() {
    return this.userSubject.asObservable();
  }

  // setUser(user) {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.userSubject.next(user);
  // }

  isAdmin() {
    return localStorage.getItem('bidblabA') != null && jwtDecode(localStorage.getItem('bidblabA')).admin;
  }

  logout() {
    // this.token = null;
    this.userSubject.next(null);
    this.clearLocalStorage();
    this.router.navigateByUrl('/login');
  }

  clearLocalStorage(){
    localStorage.removeItem('bidblabA');
  }
}
