import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}

  userLogin(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/auth/userLogin`,
      body
    );
  }

  adminLogin(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/auth/adminLogin`,
      body
    );
  }

  signup(body) {
    return this.httpClient.post(`${environment.apiUrl}/api/auth/signup`, body);
  }

  verifyAccount(token) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/auth/verifyAccount/${token}`,
      null
    );
  }

  forgotPassword(body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/auth/forgotPassword`,
      body
    );
  }

  checkResetPasswordToken(token) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/auth/checkResetPasswordToken/${token}`
    );
  }

  resetPassword(userId, token, body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/auth/resetPassword/${userId}/${token}`,
      body
    );
  }

  getQuestionsCanAnswer(limit?, offset?, search?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getQuestionsCanAnswer?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}`
    );
  }

  getQuestionByQuestionId(questionId) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getQuestionByQuestionId/${questionId}`
    );
  }

  getUserDataByuserId(userId) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getUserDataByuserId/${userId}`
    );
  }

  getUserAnswerByuserId(userId, interestFilter?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getUserAnswerByuserId?userId=${userId || ''}&interestFilter=${interestFilter || ''}`
    );
  }

  getUserQuestionByuserId(userId, interestFilter?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getUserQuestionByuserId?userId=${userId || ''}&interestFilter=${interestFilter || ''}`
    );
  }

  getQuestionsByAskerId() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getQuestionsByAskerId/`
    );
  }

  getQuestionsFollowing() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getQuestionsFollowing/`
    );
  }

  getUsersFollowing() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getUsersFollowing/`
    );
  }

  getQuestionsWithYourAnswers() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getQuestionsWithYourAnswers/`
    );
  }

  getMyCredits() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getMyCredits/`
    );
  }

  addQuestion(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/common/addQuestion`,
      body,
      {
        reportProgress: true,
      }
    );
  }

  addAnswer(questionId, answertype, body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/common/addAnswer/${questionId}/${answertype}`,
      body
    );
  }

  updateQuestion(questionId, body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/admin/updateQuestion/${questionId}`,
      body
    );
  }

  updateAnswer(questionId, answerId, body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/admin/updateAnswer/${questionId}/${answerId}`,
      body
    );
  }

  deleteQuestion(questionId) {
    return this.httpClient
      .delete(`${environment.apiUrl}/api/admin/deleteQuestion/${questionId}`)
      .toPromise();
  }

  deleteAnswer(questionId, answerId) {
    return this.httpClient
      .delete(
        `${environment.apiUrl}/api/admin/deleteAnswer/${questionId}/${answerId}`
      )
      .toPromise();
  }

  changeQuestionPicture(body) {
    return this.httpClient.patch(
      `${environment.apiUrl}/api/common/changeQuestionPicture`,
      body,
      {
        reportProgress: true,
      }
    );
  }

  addFollow(followType, objectId) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/addFollow/${followType}/${objectId}`
    );
  }
  deleteFollow(followType, objectId) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/deleteFollow/${followType}/${objectId}`
    );
  }
  addThumb(questionId, answerId, thumbType) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/addThumb/${questionId}/${answerId}/${thumbType}`
    );
  }

  addReport(questionId, answerId, body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/common/addReport/${questionId}/${answerId}`,
      body
    );
  }  
  getStandardInterests() {
    return this.httpClient.get(
      `${environment.apiUrl}/api/common/getStandardInterests`
    );
  }

  getMembers(limit?, offset?, search?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getMembers?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&active=${active || ''}&direction=${direction || ''}`
    );
  }

  sendMessage(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/sendMessage`,
      body
    );
  }  

  deleteMembers(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteMembers`,
      body
    );
  }  

  changeMembersRole(body, roleType) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/changeMembersRole/${roleType}`,
      body
    );
  }  

  getQuestions(limit?, offset?, search?, active?, direction?) {
    return this.httpClient.get(
      `${environment.apiUrl}/api/admin/getQuestions?limit=${limit ||
        10}&offset=${offset || 0}&search=${search || ''}&active=${active || ''}&direction=${direction || ''}`
    );
  }

  deleteQuestions(body) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/admin/deleteQuestions`,
      body
    );
  }  

  goHome() {
    this.router.navigateByUrl('/');
  }

}
