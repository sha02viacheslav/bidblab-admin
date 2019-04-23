import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, Answer } from '../../shared/models/question.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FlagsService {

  constructor(
    public httpClient:HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  getFlags(limit?, offset?, search?, filterTags?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getFlags?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&filterTags=${filterTags || ''}
        &active=${active || ''}&direction=${direction || ''}`
    );
  }

  changeFlagsRole(body, roleType) {
    //console.log("common service");
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/changeFlagsRole/${roleType}`,
      body
    );
  }  

  deleteFlags(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteFlags`,
      body
    );
  }
}
