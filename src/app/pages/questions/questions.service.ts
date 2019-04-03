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
export class QuestionsService {
  private headers: any; 

  constructor(
    public httpClient:HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService) { 
      this.headers = new HttpHeaders({
          'Authorization': this.authenticationService.getToken() || ''
      });
  }

  getQuestions(limit?, offset?, search?, filterTags?, active?, direction?): Observable<any>  {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/api/admin/getQuestions?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&filterTags=${filterTags || ''}
        &active=${active || ''}&direction=${direction || ''}`,
        { headers: this.headers }
    );
  }

  addQuestion(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/common/addQuestion`,
      body,
      {
        reportProgress: true,
        headers: this.headers
      }
    );
  }

  updateQuestion(questionId, body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/admin/updateQuestion/${questionId}`,
      body,
      { headers: this.headers }
    );
  }

  changeQuestionPicture(body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/common/changeQuestionPicture`,
      body,
      {
        reportProgress: true,
        headers: this.headers
      }
    );
  }

  changeQuestionsRole(body, roleType) {
    //console.log("common service");
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/changeQuestionsRole/${roleType}`,
      body,
      { headers: this.headers }
    );
  } 

  deleteQuestions(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteQuestions`,
      body,
      { headers: this.headers }
    );
  }  

}
