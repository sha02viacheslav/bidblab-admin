import { Injectable } from '@angular/core'
import { Mail } from './mail.model';
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
      public httpClient:HttpClient,
      private authenticationService: AuthenticationService
    ) { }

    sendMessage(body) {
        return this.httpClient.post(
          `${environment.apiUrl}/api/admin/sendMessage`,
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
    trashMail(body){
        return this.httpClient.post(
            `${environment.apiUrl}/api/admin/trashMail`,
            body
        );
    }
    public getMail(id: number | string) {
        return Mails.find(mail => mail.id === +id);
    }
}