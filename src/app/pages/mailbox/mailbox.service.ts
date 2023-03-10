import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { environment } from '../../../environments/environment';

let Mails = [
];
  
@Injectable({
    providedIn: 'root'
})
export class MailboxService {

    constructor(
      public httpClient:HttpClient
    ) { }

    sendMessage(body) {
        return this.httpClient.post(
          `${environment.apiUrl}/api/admin/sendMessage`,
          body
        );
    } 

    archiveMessage(body) {
        return this.httpClient.post(
          `${environment.apiUrl}/api/admin/archiveMessage`,
          body
        );
    } 
    
    getMails(limit?, offset?, search?, type?, active?, direction?): Observable<any>  {
        return this.httpClient.get<any>(
          `${environment.apiUrl}/api/admin/getMails?limit=${limit ||
            10}&offset=${offset || 0}&search=${search || ''}&type=${type ||
            ''}&active=${active || ''}&direction=${direction || ''}`
        );
    }
    applyRoleOfMails(body, roleType, apply){
        return this.httpClient.post(
            `${environment.apiUrl}/api/admin/applyRoleOfMails/${roleType}/${apply}`,
            body
        );
    }

    public getMail(id: number | string) {
        return Mails.find(mail => mail.id === +id);
    }
}