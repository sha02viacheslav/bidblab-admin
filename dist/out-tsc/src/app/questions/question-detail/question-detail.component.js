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
var answer_dialog_component_1 = require("../../shared/components/answer-dialog/answer-dialog.component");
var dialog_service_1 = require("../../shared/services/dialog.service");
var common_service_1 = require("../../shared/services/common.service");
var material_1 = require("@angular/material");
var authentication_service_1 = require("../../shared/services/authentication.service");
var block_ui_service_1 = require("../../shared/services/block-ui.service");
var router_1 = require("@angular/router");
var sockets_service_1 = require("../../shared/services/sockets.service");
var login_component_1 = require("../../shared/components/login/login.component");
var operators_1 = require("rxjs/operators");
var report_dialog_component_1 = require("../../shared/components/report-dialog/report-dialog.component");
var environment_1 = require("../../../environments/environment");
var QuestionDetailComponent = /** @class */ (function () {
    function QuestionDetailComponent(route, router, socketsService, blockUIService, commonService, snackBar, authenticationService, dialogService) {
        this.route = route;
        this.router = router;
        this.socketsService = socketsService;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
        this.serverUrl = environment_1.environment.apiUrl;
    }
    QuestionDetailComponent.prototype.ngOnInit = function () {
        this.isInit = false;
        this.isAuthenticated();
    };
    QuestionDetailComponent.prototype.ngOnDestroy = function () {
        if (this.isInit) {
            this.socketEventsSubscription.unsubscribe();
        }
    };
    QuestionDetailComponent.prototype.initialize = function () {
        this.isInit = true;
        this.getQuestion();
        this.listenToSocket();
        this.pageSize = 25;
        this.autocomplete = [];
        this.submitted = false;
        this.thumbstate = 0;
        this.followed = true;
    };
    QuestionDetailComponent.prototype.isAuthenticated = function () {
        var _this = this;
        if (this.authenticationService.isAdmin()) {
            this.initialize();
        }
        else {
            setTimeout(function () { return _this.dialogService.open(login_component_1.LoginComponent)
                .afterClosed()
                .subscribe(function (result) {
                if (result == 'OK') {
                    _this.initialize();
                }
                else {
                    _this.commonService.goHome();
                }
            }); });
        }
    };
    QuestionDetailComponent.prototype.openReportDialog = function (answerId) {
        var _this = this;
        this.dialogService
            .open(report_dialog_component_1.ReportDialogComponent, {
            data: {
                questionId: this.question._id,
                answerId: answerId,
            }
        })
            .afterClosed()
            .subscribe(function (newRport) {
            if (newRport) {
                _this.reports.push(newRport);
            }
        });
    };
    QuestionDetailComponent.prototype.openAnswerDialog = function (answer) {
        var _this = this;
        this.dialogService
            .open(answer_dialog_component_1.AnswerDialogComponent, {
            data: {
                questionId: this.question._id,
                answer: answer
            }
        })
            .afterClosed()
            .subscribe(function (newAnswer) {
            if (newAnswer) {
                if (answer) {
                    var index = _this.question.answers.findIndex(function (currentAnswer) { return currentAnswer._id === answer._id; });
                    if (index !== -1) {
                        _this.question.answers[index] = newAnswer;
                    }
                }
                else {
                    _this.question.answers.push(newAnswer);
                }
            }
        });
    };
    QuestionDetailComponent.prototype.getQuestionByQuestionId = function (questionId) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        this.commonService.getQuestionByQuestionId(questionId).subscribe(function (res) {
            _this.question = res.data.question;
            _this.sortAnswers(_this.question.answers);
            _this.reports = res.data.reports;
            _this.followed = !_this.canFollow();
            _this.blockUIService.setBlockStatus(false);
        }, function (err) {
            _this.snackBar.open(err.error.msg, 'Dismiss');
        });
    };
    QuestionDetailComponent.prototype.canReport = function (answerId, answererId) {
        var _this = this;
        return (!(this.authenticationService.getUser()._id === answererId) &&
            !this.reports.some(function (report) {
                return report.answerId === answerId &&
                    report.reporter === _this.authenticationService.getUser()._id;
            }));
    };
    QuestionDetailComponent.prototype.canFollow = function () {
        var _this = this;
        return (!this.question.asker ||
            !(this.authenticationService.getUser()._id === this.question.asker._id) &&
                !this.question.follows.some(function (follow) {
                    return follow.follower &&
                        follow.follower === _this.authenticationService.getUser()._id;
                }));
    };
    QuestionDetailComponent.prototype.isAsker = function () {
        return (this.authenticationService.getUser() &&
            this.question.asker &&
            this.question.asker._id === this.authenticationService.getUser()._id);
    };
    QuestionDetailComponent.prototype.canAnswer = function () {
        var _this = this;
        return (!this.authenticationService.getUser() ||
            !this.question.answers.some(function (answer) {
                return answer.answerer &&
                    answer.answerer._id === _this.authenticationService.getUser()._id;
            }));
    };
    QuestionDetailComponent.prototype.isAdmin = function () {
        return this.authenticationService.isAdmin();
    };
    QuestionDetailComponent.prototype.deleteQuestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.deleteQuestion(this.question._id)];
                    case 1:
                        res = (_a.sent());
                        this.socketsService.notify('deletedData', {
                            type: 'question',
                            data: res.data
                        });
                        this.snackBar.open(res.msg, 'Dismiss', {
                            duration: 1500
                        });
                        this.router.navigateByUrl('/');
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
    QuestionDetailComponent.prototype.deleteAnswer = function (answerId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, index, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.deleteAnswer(this.question._id, answerId)];
                    case 1:
                        res = (_a.sent());
                        this.socketsService.notify('deletedData', {
                            type: 'answer',
                            data: Object.assign({ questionId: this.question._id }, res.data)
                        });
                        this.snackBar.open(res.msg, 'Dismiss', {
                            duration: 1500
                        });
                        index = this.question.answers.findIndex(function (currentAnswer) { return currentAnswer._id === answerId; });
                        if (index !== -1) {
                            this.question.answers.splice(index, 1);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        this.snackBar.open(err_2.error.msg, 'Dismiss');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    QuestionDetailComponent.prototype.listenToSocket = function () {
        var _this = this;
        this.socketEventsSubscription = this.socketsService
            .getSocketEvents()
            .pipe(operators_1.filter(function (event) { return event.payload; }))
            .subscribe(function (event) {
            if (event.payload.type === 'answer') {
                _this.snackBar.open('Answers were updated.', 'Dismiss', {
                    duration: 2000
                });
                if (event.name === 'createdData') {
                    _this.question.answers.push(event.payload.data);
                }
                else {
                    var index = _this.question.answers.findIndex(function (currentAnswer) { return currentAnswer._id === event.payload.data._id; });
                    if (index !== -1) {
                        if (event.name === 'updatedData') {
                            _this.question.answers[index] = event.payload.data;
                        }
                        else {
                            _this.question.answers.splice(index, 1);
                        }
                    }
                }
            }
            else {
                if (event.name === 'updatedData') {
                    _this.question = event.payload.data;
                    _this.snackBar.open('Question was updated.', 'Dismiss', {
                        duration: 2000
                    });
                }
                else if (event.name === 'deletedData') {
                    _this.snackBar.open('Question was deleted.', 'Dismiss');
                    _this.router.navigateByUrl('/');
                }
            }
        });
    };
    QuestionDetailComponent.prototype.getQuestion = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            if (params.has('questionId')) {
                var questionId = params.get('questionId');
                _this.getQuestionByQuestionId(questionId);
            }
        });
    };
    QuestionDetailComponent.prototype.addFollow = function (followType) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        if (this.question._id && this.authenticationService.getUser()._id) {
            this.commonService
                .addFollow(followType, this.question._id)
                .subscribe(function (res) {
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(res.msg, 'Dismiss', {
                    duration: 1500
                })
                    .afterOpened()
                    .subscribe(function () {
                    _this.followed = true;
                });
            }, function (err) {
                _this.submitted = false;
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(err.error.msg, 'Dismiss', {
                    duration: 4000
                })
                    .afterDismissed()
                    .subscribe(function () { });
            });
        }
    };
    QuestionDetailComponent.prototype.sortAnswers = function (answers) {
        answers.sort(function (a, b) {
            a.thumbupcnt = a.thumbupcnt ? a.thumbupcnt : 0;
            b.thumbupcnt = b.thumbupcnt ? b.thumbupcnt : 0;
            a.thumbdowncnt = a.thumbdowncnt ? a.thumbdowncnt : 0;
            b.thumbdowncnt = b.thumbdowncnt ? b.thumbdowncnt : 0;
            var temp1 = a.thumbupcnt - a.thumbdowncnt;
            var temp2 = b.thumbupcnt - b.thumbdowncnt;
            if (temp1 < temp2) {
                return 1;
            }
            else if (temp1 > temp2) {
                return -1;
            }
            else {
                return 0;
            }
        });
    };
    QuestionDetailComponent.prototype.thumbup = function (answerId) {
        if (this.thumbstate == 0 || this.thumbstate == 2) {
            this.addThumb(answerId, 1);
        }
    };
    QuestionDetailComponent.prototype.thumbdown = function (answerId) {
        if (this.thumbstate == 0 || this.thumbstate == 1) {
            this.addThumb(answerId, 2);
        }
    };
    QuestionDetailComponent.prototype.addThumb = function (answerId, thumbType) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        if (this.question._id && this.authenticationService.getUser()._id) {
            this.commonService
                .addThumb(this.question._id, answerId, thumbType)
                .subscribe(function (res) {
                _this.question = res.data;
                _this.sortAnswers(_this.question.answers);
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(res.msg, 'Dismiss', {
                    duration: 1500
                })
                    .afterOpened()
                    .subscribe(function () {
                    _this.submitted = true;
                });
            }, function (err) {
                _this.submitted = false;
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(err.error.msg, 'Dismiss', {
                    duration: 4000
                })
                    .afterDismissed()
                    .subscribe(function () { });
            });
        }
    };
    QuestionDetailComponent.prototype.alert = function () {
        this.snackBar
            .open("You can't see private answerer", 'Dismiss', {
            duration: 4000
        });
    };
    QuestionDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-question-detail',
            templateUrl: './question-detail.component.html',
            styleUrls: ['./question-detail.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            sockets_service_1.SocketsService,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService])
    ], QuestionDetailComponent);
    return QuestionDetailComponent;
}());
exports.QuestionDetailComponent = QuestionDetailComponent;
//# sourceMappingURL=question-detail.component.js.map