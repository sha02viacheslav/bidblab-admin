import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    public httpClient:HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  addQuestion(body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/admin/addQuestion`,
      body,
      {
        reportProgress: true
      }
    );
  }

  getQuestions(limit?, offset?, search?, filterTags?, active?, direction?): Observable<any>  {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/api/admin/getQuestions?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&filterTags=${filterTags || ''}
        &active=${active || ''}&direction=${direction || ''}`
    );
  }

  getQuestionByQuestionId(questionId) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getQuestionByQuestionId/${questionId}`
    );
  }

  updateQuestion(body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/common/updateQuestion`,
      body,
      {
        reportProgress: true
      }
    );
  }

  changeQuestionPicture(body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/common/changeQuestionPicture`,
      body,
      {
        reportProgress: true
      }
    );
  }

  deleteQuestions(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteQuestions`,
      body
    );
  }  

  changeQuestionsRole(body, roleType) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/changeQuestionsRole/${roleType}`,
      body
    );
  } 

  addAnswer(questionId, answertype, body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/common/addAnswer/${questionId}/${answertype}`,
      body
    );
  }

  getAnswers(limit?, offset?, search?, filterTags?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getAnswers?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&filterTags=${filterTags || ''}
        &active=${active || ''}&direction=${direction || ''}`
    );
  }

  updateAnswer(questionId, answerId, body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/admin/updateAnswer/${questionId}/${answerId}`,
      body
    );
  }

}

