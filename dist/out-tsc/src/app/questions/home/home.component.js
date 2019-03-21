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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_service_1 = require("../../shared/services/common.service");
var material_1 = require("@angular/material");
var dialog_service_1 = require("../../shared/services/dialog.service");
var authentication_service_1 = require("../../shared/services/authentication.service");
var block_ui_service_1 = require("../../shared/services/block-ui.service");
var question_dialog_component_1 = require("../../shared/components/question-dialog/question-dialog.component");
var login_component_1 = require("../../shared/components/login/login.component");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var answer_dialog_component_1 = require("../../shared/components/answer-dialog/answer-dialog.component");
var sockets_service_1 = require("../../shared/services/sockets.service");
var alert_dialog_component_1 = require("../../shared/components/alert-dialog/alert-dialog.component");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(fb, socketsService, blockUIService, commonService, snackBar, authenticationService, dialogService, router) {
        this.fb = fb;
        this.socketsService = socketsService;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.newQuestionFlag = false;
        this.pageSize = 10;
        this.autocomplete = [];
        this.form = this.fb.group({
            search: ''
        });
        this.autocompleteSubscription = this.form
            .get('search')
            .valueChanges.pipe(operators_1.debounceTime(100))
            .subscribe(function (text) {
            if (text.trim()) {
                _this.commonService
                    .getQuestions(null, null, text)
                    .subscribe(function (res) {
                    _this.autocomplete = res.data.questions;
                    if (!_this.autocomplete.length) {
                        _this.newQuestionFlag = true;
                    }
                    else {
                        _this.newQuestionFlag = false;
                    }
                });
            }
            else {
                _this.autocomplete.splice(0);
                _this.newQuestionFlag = false;
            }
        });
        this.getQuestions();
        this.listenToSocket();
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.autocompleteSubscription.unsubscribe();
        this.socketEventsSubscription.unsubscribe();
    };
    HomeComponent.prototype.openQuestionDialog = function (newTitle, question) {
        var _this = this;
        if (this.authenticationService.isAdmin()) {
            this.dialogService
                .open(question_dialog_component_1.QuestionDialogComponent, {
                data: {
                    question: question,
                    newTitle: newTitle,
                },
                width: '800px'
            })
                .afterClosed()
                .subscribe(function (newQuestion) {
                if (newQuestion) {
                    if (question) {
                        var index = _this.questions.findIndex(function (currentQuestion) { return currentQuestion._id === question._id; });
                        if (index !== -1) {
                            _this.questions[index] = newQuestion;
                        }
                    }
                    else {
                        _this.questions.push(newQuestion);
                    }
                    _this.dialogService.
                        open(alert_dialog_component_1.AlertDialogComponent, {
                        data: {
                            title: "Question submitted",
                            comment: " ",
                            dialog_type: "ask"
                        },
                        width: '320px',
                    }).afterClosed().subscribe(function (result) {
                        if (result == 'more') {
                            _this.openQuestionDialog();
                        }
                    });
                }
            });
        }
        else {
            this.dialogService.open(login_component_1.LoginComponent);
        }
    };
    HomeComponent.prototype.openAnswerDialog = function (questionId, answer) {
        var _this = this;
        if (this.authenticationService.isAdmin()) {
            this.dialogService
                .open(answer_dialog_component_1.AnswerDialogComponent, {
                data: {
                    questionId: questionId,
                    answer: answer
                }
            })
                .afterClosed()
                .subscribe(function (newAnswer) {
                if (newAnswer) {
                    var index = _this.questions.findIndex(function (question) { return question._id === questionId; });
                    if (index !== -1) {
                        var question = _this.questions[index];
                        if (answer) {
                            index = question.answers.findIndex(function (currentAnswer) { return currentAnswer._id === answer._id; });
                            if (index !== -1) {
                                question.answers[index] = newAnswer;
                            }
                        }
                        else {
                            question.answers.push(newAnswer);
                        }
                    }
                }
            });
        }
        else {
            this.dialogService.open(login_component_1.LoginComponent);
        }
    };
    HomeComponent.prototype.searchBoxAction = function () {
        if (this.newQuestionFlag) {
            this.newQuestionFlag = false;
            this.openQuestionDialog(this.form.value.search);
        }
        else {
            this.getQuestions();
        }
    };
    HomeComponent.prototype.getQuestions = function (event) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        if (event) {
            this.pageSize = event.pageSize;
        }
        this.autocomplete.splice(0);
        var observable = event
            ? this.commonService.getQuestions(event.pageSize, event.pageIndex, this.form.value.search)
            : this.commonService.getQuestions(null, null, this.form.value.search);
        observable.subscribe(function (res) {
            _this.totalQuestionsCount = res.data.count;
            _this.questions = res.data.questions;
            _this.blockUIService.setBlockStatus(false);
        }, function (err) {
            _this.snackBar.open(err.error.msg, 'Dismiss');
        });
    };
    HomeComponent.prototype.isAsker = function (questionId) {
        var question = this.questions.find(function (currentQuestion) { return currentQuestion._id === questionId; });
        return (this.authenticationService.getUser() &&
            question.asker &&
            question.asker._id === this.authenticationService.getUser()._id);
    };
    HomeComponent.prototype.isAdmin = function () {
        return this.authenticationService.isAdmin();
    };
    HomeComponent.prototype.canAnswer = function (questionId) {
        var _this = this;
        return (!this.authenticationService.getUser() ||
            !this.questions
                .find(function (question) { return question._id === questionId; })
                .answers.some(function (answer) {
                return answer.answerer &&
                    answer.answerer._id === _this.authenticationService.getUser()._id;
            }));
    };
    HomeComponent.prototype.listenToSocket = function () {
        var _this = this;
        this.socketEventsSubscription = this.socketsService
            .getSocketEvents()
            .pipe(operators_1.filter(function (event) { return event.payload; }))
            .subscribe(function (event) {
            _this.snackBar.open('Questions were updated.', 'Dismiss', {
                duration: 2000
            });
            if (event.payload.type === 'question') {
                if (event.name === 'createdData') {
                    _this.totalQuestionsCount++;
                    if (_this.questions.length < _this.pageSize) {
                        _this.questions.push(event.payload.data);
                    }
                }
                else {
                    var index = _this.questions.findIndex(function (currentQuestion) { return currentQuestion._id === event.payload.data._id; });
                    if (index !== -1) {
                        if (event.name === 'updatedData') {
                            _this.questions[index] = event.payload.data;
                        }
                        else {
                            _this.questions.splice(index, 1);
                            _this.totalQuestionsCount--;
                        }
                    }
                }
            }
            else {
                var index = _this.questions.findIndex(function (currentQuestion) {
                    return currentQuestion._id === event.payload.data.questionId;
                });
                if (index !== -1) {
                    var question = _this.questions[index];
                    if (event.name === 'createdData') {
                        question.answers.push(event.payload.data);
                    }
                    else {
                        index = question.answers.findIndex(function (currentAnswer) { return currentAnswer._id === event.payload.data._id; });
                        if (index !== -1) {
                            if (event.name === 'updatedData') {
                                question.answers[index] = event.payload.data;
                            }
                            else {
                                question.answers.splice(index, 1);
                            }
                        }
                    }
                }
            }
        });
    };
    HomeComponent.prototype.deleteQuestion = function (questionId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, index, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.deleteQuestion(questionId)];
                    case 1:
                        res = (_a.sent());
                        this.socketsService.notify('deletedData', {
                            type: 'question',
                            data: res.data
                        });
                        this.snackBar.open(res.msg, 'Dismiss', {
                            duration: 1500
                        });
                        index = this.questions.findIndex(function (currentQuestion) { return currentQuestion._id === questionId; });
                        if (index !== -1) {
                            this.questions.splice(index, 1);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.snackBar.open(err_1.error.msg, 'Dismiss');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home-questions',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            sockets_service_1.SocketsService,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService,
            router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map