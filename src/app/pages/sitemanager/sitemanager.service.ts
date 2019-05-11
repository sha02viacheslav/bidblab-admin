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
export class SitemanagerService {

  constructor(
    public httpClient:HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  getAboutPageContent() {
		return this.httpClient.get(
			`${environment.apiUrl}/api/common/getAboutPageContent`
		);
	}

  saveAbout(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/saveAbout`,
      body
    );
  } 

  getHowPageContent() {
		return this.httpClient.get(
			`${environment.apiUrl}/api/common/getHowPageContent`
		);
	}

  saveHow(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/saveHow`,
      body
    );
  } 

  getTermsPageContent() {
		return this.httpClient.get(
			`${environment.apiUrl}/api/common/getTermsPageContent`
		);
	}

  saveTerms(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/saveTerms`,
      body
    );
  } 

  getCookiePageContent() {
		return this.httpClient.get(
			`${environment.apiUrl}/api/common/getCookiePageContent`
		);
	}

  saveCookie(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/saveCookie`,
      body
    );
  } 

  getPrivacyPageContent() {
		return this.httpClient.get(
			`${environment.apiUrl}/api/common/getPrivacyPageContent`
		);
	}

  savePrivacy(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/savePrivacy`,
      body
    );
  } 
}
