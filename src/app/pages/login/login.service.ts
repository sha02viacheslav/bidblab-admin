import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}

  adminLogin(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/auth/adminLogin`,
      body
    );
  } 
}
