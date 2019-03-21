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
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var common_service_1 = require("../../services/common.service");
var sockets_service_1 = require("../../services/sockets.service");
var block_ui_service_1 = require("../../services/block-ui.service");
var authentication_service_1 = require("../../services/authentication.service");
var animations_1 = require("@angular/animations");
var dialog_service_1 = require("../../../shared/services/dialog.service");
var alert_dialog_component_1 = require("../../../shared/components/alert-dialog/alert-dialog.component");
var environment_1 = require("../../../../environments/environment");
var AnswerBoxComponent = /** @class */ (function () {
    function AnswerBoxComponent(fb, commonService, socketsService, blockUIService, snackBar, authenticationService, dialogService) {
        this.fb = fb;
        this.commonService = commonService;
        this.socketsService = socketsService;
        this.blockUIService = blockUIService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
        this.visibleState = true;
        this.serverUrl = environment_1.environment.apiUrl;
    }
    AnswerBoxComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            content: '',
        });
    };
    AnswerBoxComponent.prototype.submitForm = function (answertype) {
        var _this = this;
        this.pre_answer = this.question.answers.find(function (answer) {
            return answer.answerer &&
                answer.answerer._id === _this.authenticationService.getUser()._id;
        });
        if (answertype == 'skip') {
            this.visibleState = false;
        }
        if (this.form.valid) {
            this.blockUIService.setBlockStatus(true);
            //update answer
            if (this.pre_answer) {
                this.commonService
                    .updateAnswer(this.question._id, this.pre_answer._id, this.form.value)
                    .subscribe(function (res) {
                    _this.socketsService.notify('updatedData', {
                        type: 'answer',
                        data: Object.assign({
                            questionId: _this.question._id
                        }, res.data)
                    });
                    _this.blockUIService.setBlockStatus(false);
                    _this.snackBar
                        .open(res.msg, 'Dismiss', {
                        duration: 1500
                    })
                        .afterOpened()
                        .subscribe(function () {
                        res.data.answerer = _this.authenticationService.getUser()._id;
                        _this.respons_submitAnswer(res.data);
                    });
                }, function (err) {
                    //this.submitted = false;
                    _this.blockUIService.setBlockStatus(false);
                    _this.snackBar
                        .open(err.error.msg, 'Dismiss', {
                        duration: 4000
                    })
                        .afterDismissed()
                        .subscribe(function () { });
                });
            }
            else {
                //add answer
                this.commonService
                    .addAnswer(this.question._id, answertype, this.form.value)
                    .subscribe(function (res) {
                    _this.blockUIService.setBlockStatus(false);
                    _this.visibleState = false;
                    _this.socketsService.notify('createdData', {
                        type: 'answer',
                        data: Object.assign({ questionId: _this.question._id }, res.data)
                    });
                    _this.snackBar
                        .open(res.msg, 'Dismiss', {
                        duration: 1500
                    })
                        .afterOpened()
                        .subscribe(function () {
                        // this.dialogRef.close(res.data);
                        //this.respons_submitAnswer(res.data);
                    });
                    _this.dialogService.
                        open(alert_dialog_component_1.AlertDialogComponent, {
                        data: {
                            title: "Answer submitted",
                            comment: "You earned 8 BidBlab Credits",
                            dialog_type: "answer"
                        },
                        width: '320px',
                    }).afterClosed().subscribe(function (result) {
                        if (result == 'dismiss') {
                            _this.commonService.goHome();
                        }
                    });
                }, function (err) {
                    //this.submitted = false;
                    _this.blockUIService.setBlockStatus(false);
                    _this.snackBar
                        .open(err.error.msg, 'Dismiss', {
                        duration: 4000
                    })
                        .afterDismissed()
                        .subscribe(function () { });
                });
            }
        }
    };
    AnswerBoxComponent.prototype.respons_submitAnswer = function (newAnswer) {
        if (newAnswer) {
            var index = this.question.answers.findIndex(function (currentAnswer) { return currentAnswer._id === newAnswer._id; });
            if (index !== -1) {
                this.question.answers[index] = newAnswer;
            }
            else {
                this.question.answers.push(newAnswer);
            }
        }
    };
    AnswerBoxComponent.prototype.isAdmin = function () {
        return this.authenticationService.isAdmin();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AnswerBoxComponent.prototype, "question", void 0);
    AnswerBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-answer-box',
            animations: [
                animations_1.trigger('flyInOut', [
                    animations_1.state('in', animations_1.style({ transform: 'translateX(0)' })),
                    animations_1.transition('* => void', [
                        animations_1.animate(100, animations_1.style({ transform: 'translateX(100%)' }))
                    ])
                ])
            ],
            templateUrl: './answer-box.component.html',
            styleUrls: ['./answer-box.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            common_service_1.CommonService,
            sockets_service_1.SocketsService,
            block_ui_service_1.BlockUIService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService])
    ], AnswerBoxComponent);
    return AnswerBoxComponent;
}());
exports.AnswerBoxComponent = AnswerBoxComponent;
//# sourceMappingURL=answer-box.component.js.map