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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var form_validation_service_1 = require("../../services/form-validation.service");
var block_ui_service_1 = require("../../services/block-ui.service");
var material_1 = require("@angular/material");
var common_service_1 = require("../../services/common.service");
var sockets_service_1 = require("../../services/sockets.service");
var AnswerDialogComponent = /** @class */ (function () {
    function AnswerDialogComponent(fb, formValidationService, socketsService, blockUIService, commonService, snackBar, dialogRef, data) {
        this.fb = fb;
        this.formValidationService = formValidationService;
        this.socketsService = socketsService;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    AnswerDialogComponent.prototype.ngOnInit = function () {
        this.submitted = false;
        this.form = this.fb.group({
            content: [
                this.data.answer ? this.data.answer.content : '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(500),
                    this.formValidationService.isBlank
                ]
            ]
        });
    };
    AnswerDialogComponent.prototype.checkError = function (form, field, error) {
        return this.formValidationService.checkError(form, field, error);
    };
    AnswerDialogComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.form.valid) {
            this.submitted = true;
            this.blockUIService.setBlockStatus(true);
            if (this.data.answer) {
                this.commonService
                    .updateAnswer(this.data.questionId, this.data.answer._id, this.form.value)
                    .subscribe(function (res) {
                    _this.socketsService.notify('updatedData', {
                        type: 'answer',
                        data: Object.assign({ questionId: _this.data.questionId }, res.data)
                    });
                    _this.blockUIService.setBlockStatus(false);
                    _this.snackBar
                        .open(res.msg, 'Dismiss', {
                        duration: 1500
                    })
                        .afterOpened()
                        .subscribe(function () {
                        res.data.answerer = _this.data.answer.answerer;
                        _this.dialogRef.close(res.data);
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
            else {
                this.commonService
                    .addAnswer(this.data.questionId, 2, this.form.value)
                    .subscribe(function (res) {
                    _this.socketsService.notify('createdData', {
                        type: 'answer',
                        data: Object.assign({ questionId: _this.data.questionId }, res.data)
                    });
                    _this.blockUIService.setBlockStatus(false);
                    _this.snackBar
                        .open(res.msg, 'Dismiss', {
                        duration: 1500
                    })
                        .afterOpened()
                        .subscribe(function () {
                        _this.dialogRef.close(res.data);
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
        }
    };
    AnswerDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-answer-dialog',
            templateUrl: './answer-dialog.component.html'
        }),
        __param(7, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            form_validation_service_1.FormValidationService,
            sockets_service_1.SocketsService,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            material_1.MatDialogRef, Object])
    ], AnswerDialogComponent);
    return AnswerDialogComponent;
}());
exports.AnswerDialogComponent = AnswerDialogComponent;
//# sourceMappingURL=answer-dialog.component.js.map