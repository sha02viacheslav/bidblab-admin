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
export class CreditsService {

  constructor(
    public httpClient:HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  getDefaultCredits() {
		return this.httpClient.get(
			`${environment.apiUrl}/api/admin/getDefaultCredits`
		);
	}

	changeDefaultCredits(body) {
		return this.httpClient.post(
			`${environment.apiUrl}/api/admin/changeDefaultCredits`,
			body
		);
  }
}
