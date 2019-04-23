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
    private headers: any; 

    constructor(
      public httpClient:HttpClient,
      private authenticationService: AuthenticationService
    ) { 
        this.headers = new HttpHeaders({
            'Authorization': this.authenticationService.getToken() || ''
        });
    }
    
    public getAllMails() {
        return Mails.filter(mail => mail.sent == false && mail.draft == false && mail.trash == false);
    }
    
    public getStarredMails() {
        return Mails.filter(mail => mail.starred == true);
    }

    public getSentMails() {
        return Mails.filter(mail => mail.sent == true);
    }

    public getDraftMails() {
        return Mails.filter(mail => mail.draft == true);
    }

    public getTrashMails() {
        return Mails.filter(mail => mail.trash == true);
    }

    public getMail(id: number | string) {
        return Mails.find(mail => mail.id === +id);
    }
}