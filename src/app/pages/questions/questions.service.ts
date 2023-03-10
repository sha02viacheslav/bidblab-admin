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

  deleteAnswers(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteAnswers`,
      body
    );
  } 

  getTags(limit?, offset?, search?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getTags?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&active=${active || ''}&direction=${direction || ''}`
    );
  }

  addTag(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/addTag`,
      body
    );
  }

  updateTag(tagId, body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/updateTag/${tagId}`,
      body
    );
  }

  deleteTags(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteTags`,
      body
    );
  }  

  getInterests(limit?, offset?, search?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getInterests?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&active=${active || ''}&direction=${direction || ''}`
    );
  }

  addInterest(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/addInterest`,
      body
    );
  }

  updateInterest(interestId, body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/updateInterest/${interestId}`,
      body
    );
  }

  deleteInterests(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteInterests`,
      body
    );
  }  
}

