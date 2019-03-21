"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../environments/environment");
var router_1 = require("@angular/router");
var CommonService = /** @class */ (function () {
    function CommonService(router, httpClient) {
        this.router = router;
        this.httpClient = httpClient;
    }
    CommonService.prototype.userLogin = function (body) {
        return this.httpClient.post(environment_1.environment.apiUrl + "/api/auth/userLogin", body);
    };
    CommonService.prototype.adminLogin = function (body) {
        return this.httpClient.post(environment_1.environment.apiUrl + "/api/auth/adminLogin", body);
    };
    CommonService.prototype.signup = function (body) {
        return this.httpClient.post(environment_1.environment.apiUrl + "/api/auth/signup", body);
    };
    CommonService.prototype.verifyAccount = function (token) {
        return this.httpClient.patch(environment_1.environment.apiUrl + "/api/auth/verifyAccount/" + token, null);
    };
    CommonService.prototype.forgotPassword = function (body) {
        return this.httpClient.patch(environment_1.environment.apiUrl + "/api/auth/forgotPassword", body);
    };
    CommonService.prototype.checkResetPasswordToken = function (token) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/auth/checkResetPasswordToken/" + token);
    };
    CommonService.prototype.resetPassword = function (userId, token, body) {
        return this.httpClient.patch(environment_1.environment.apiUrl + "/api/auth/resetPassword/" + userId + "/" + token, body);
    };
    CommonService.prototype.getQuestions = function (limit, offset, search) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getQuestions?limit=" + (limit ||
            10) + "&offset=" + (offset || 0) + "&search=" + (search || ''));
    };
    CommonService.prototype.getQuestionsCanAnswer = function (limit, offset, search) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getQuestionsCanAnswer?limit=" + (limit ||
            10) + "&offset=" + (offset || 0) + "&search=" + (search || ''));
    };
    CommonService.prototype.getQuestionByQuestionId = function (questionId) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getQuestionByQuestionId/" + questionId);
    };
    CommonService.prototype.getUserDataByuserId = function (userId) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getUserDataByuserId/" + userId);
    };
    CommonService.prototype.getUserAnswerByuserId = function (userId, interestFilter) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getUserAnswerByuserId?userId=" + (userId || '') + "&interestFilter=" + (interestFilter || ''));
    };
    CommonService.prototype.getUserQuestionByuserId = function (userId, interestFilter) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getUserQuestionByuserId?userId=" + (userId || '') + "&interestFilter=" + (interestFilter || ''));
    };
    CommonService.prototype.getQuestionsByAskerId = function () {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getQuestionsByAskerId/");
    };
    CommonService.prototype.getQuestionsFollowing = function () {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getQuestionsFollowing/");
    };
    CommonService.prototype.getUsersFollowing = function () {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getUsersFollowing/");
    };
    CommonService.prototype.getQuestionsWithYourAnswers = function () {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getQuestionsWithYourAnswers/");
    };
    CommonService.prototype.getMyCredits = function () {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getMyCredits/");
    };
    CommonService.prototype.addQuestion = function (body) {
        return this.httpClient.post(environment_1.environment.apiUrl + "/api/common/addQuestion", body, {
            reportProgress: true,
        });
    };
    CommonService.prototype.addAnswer = function (questionId, answertype, body) {
        return this.httpClient.post(environment_1.environment.apiUrl + "/api/common/addAnswer/" + questionId + "/" + answertype, body);
    };
    CommonService.prototype.updateQuestion = function (questionId, body) {
        return this.httpClient.patch(environment_1.environment.apiUrl + "/api/admin/updateQuestion/" + questionId, body);
    };
    CommonService.prototype.updateAnswer = function (questionId, answerId, body) {
        return this.httpClient.patch(environment_1.environment.apiUrl + "/api/admin/updateAnswer/" + questionId + "/" + answerId, body);
    };
    CommonService.prototype.deleteQuestion = function (questionId) {
        return this.httpClient
            .delete(environment_1.environment.apiUrl + "/api/admin/deleteQuestion/" + questionId)
            .toPromise();
    };
    CommonService.prototype.deleteUser = function (userId) {
        return this.httpClient
            .delete(environment_1.environment.apiUrl + "/api/admin/deleteUser/" + userId)
            .toPromise();
    };
    CommonService.prototype.deleteAnswer = function (questionId, answerId) {
        return this.httpClient
            .delete(environment_1.environment.apiUrl + "/api/admin/deleteAnswer/" + questionId + "/" + answerId)
            .toPromise();
    };
    CommonService.prototype.changeQuestionPicture = function (body) {
        return this.httpClient.patch(environment_1.environment.apiUrl + "/api/common/changeQuestionPicture", body, {
            reportProgress: true,
        });
    };
    CommonService.prototype.addFollow = function (followType, objectId) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/addFollow/" + followType + "/" + objectId);
    };
    CommonService.prototype.deleteFollow = function (followType, objectId) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/deleteFollow/" + followType + "/" + objectId);
    };
    CommonService.prototype.addThumb = function (questionId, answerId, thumbType) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/addThumb/" + questionId + "/" + answerId + "/" + thumbType);
    };
    CommonService.prototype.addReport = function (questionId, answerId, body) {
        return this.httpClient.post(environment_1.environment.apiUrl + "/api/common/addReport/" + questionId + "/" + answerId, body);
    };
    CommonService.prototype.getStandardInterests = function () {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/common/getStandardInterests");
    };
    CommonService.prototype.getMembers = function (limit, offset, search) {
        return this.httpClient.get(environment_1.environment.apiUrl + "/api/admin/getMembers?limit=" + (limit ||
            10) + "&offset=" + (offset || 0) + "&search=" + (search || ''));
    };
    CommonService.prototype.goHome = function () {
        this.router.navigateByUrl('/');
    };
    CommonService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            http_1.HttpClient])
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map