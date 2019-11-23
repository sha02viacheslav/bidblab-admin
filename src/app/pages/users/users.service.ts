import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
    constructor(
        public httpClient:HttpClient,
        private authenticationService: AuthenticationService
    ) { }

    createUser(body) {
      return this.httpClient.post(
        `${environment.apiUrl}/api/admin/createUser`,
        body
      );
    }
  
    getUsers(limit?, offset?, search?, active?, direction?) {
      return this.httpClient.get(
        `${environment.apiUrl}/api/admin/getMembers?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&active=${active || ''}&direction=${direction || ''}`
      );
    }
  
    updateUser(userId, body) {
      return this.httpClient.patch(
        `${environment.apiUrl}/api/admin/updateUser/${userId}`,
        body
      );
    }
  
    deleteUsers(body) {
      return this.httpClient.post(
        `${environment.apiUrl}/api/admin/deleteMembers`,
        body
      );
    } 

    changeUsersRole(body, roleType) {
      return this.httpClient.post(
        `${environment.apiUrl}/api/admin/changeMembersRole/${roleType}`,
        body
      );
    }

    getUserDataByuserId(userId) {
      return this.httpClient.get(
        `${environment.apiUrl}/api/common/getUserDataByuserId/${userId}`
      );
    }

    getUserAnswerByuserId(userId, tagFilter?) {
      return this.httpClient.get(
        `${environment.apiUrl}/api/common/getUserAnswerByuserId?userId=${userId || ''}&tagFilter=${tagFilter || ''}`
      );
    }
  
    getUserQuestionByuserId(userId, tagFilter?) {
      return this.httpClient.get(
        `${environment.apiUrl}/api/common/getUserQuestionByuserId?userId=${userId || ''}&tagFilter=${tagFilter || ''}`
      );
    }

    getQuestionsFollowing() {
      return this.httpClient.get(
        `${environment.apiUrl}/api/common/getQuestionsFollowing/`
      );
    }

    getLogins(userId) {
      return this.httpClient.get(
        `${environment.apiUrl}/api/admin/getLogins/${userId}`
      );
    }
} 

