import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable()
export class UsersService {
    public url = "api/users";
    private headers: any; 
    
    constructor(
        public httpClient:HttpClient,
        private authenticationService: AuthenticationService
    ) { 
        this.headers = new HttpHeaders({
            'Authorization': this.authenticationService.getToken() || ''
        });
    }

    getUsers(limit?, offset?, search?, active?, direction?): Observable<any>  {
        return this.httpClient.get<any>(
          `${environment.apiUrl}/api/admin/getMembers?limit=${limit ||
            10}&offset=${offset || 0}&search=${search || ''}&active=${active || ''}&direction=${direction || ''}`,
            { headers: this.headers }
        );
    }

    updateUser(userId, body) {
        return this.httpClient.patch(
          `${environment.apiUrl}/api/admin/updateUser/${userId}`,
          body,
          { headers: this.headers }
        );
      }

    addUser(user:User){	    
        return this.httpClient.post(this.url, user);
    }

  
    deleteUser(id: number) {
        return this.httpClient.delete(this.url + "/" + id);
    } 

    sendMessage(body) {
        return this.httpClient.post(
          `${environment.apiUrl}/api/admin/sendMessage`,
          body,
          { headers: this.headers }
        );
    }  
    
    changeUsersRole(body, roleType) {
        return this.httpClient.post(
          `${environment.apiUrl}/api/admin/changeMembersRole/${roleType}`,
          body,
          { headers: this.headers }
        );
    }  

    deleteUsers(body: any) {
        return this.httpClient.post(
          `${environment.apiUrl}/api/admin/deleteMembers`,
          body,
          { headers: this.headers }
        );
    } 
} 

