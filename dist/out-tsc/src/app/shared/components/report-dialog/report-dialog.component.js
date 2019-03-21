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
var authentication_service_1 = require("../../../shared/services/authentication.service");
var user_service_1 = require("../../../shared/services/user.service");
var ReportDialogComponent = /** @class */ (function () {
    function ReportDialogComponent(fb, formValidationService, blockUIService, commonService, socketsService, authenticationService, snackBar, userService, dialogRef, data) {
        this.fb = fb;
        this.formValidationService = formValidationService;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.socketsService = socketsService;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ReportDialogComponent.prototype.ngOnInit = function () {
        this.reports = ["spam", "abuse", "unappropriated"];
        this.form = this.fb.group({
            reportType: [
                this.reports[0],
                [
                    forms_1.Validators.required,
                    this.formValidationService.isBlank
                ]
            ],
            reportNote: [
                '',
                [
                    forms_1.Validators.maxLength(50),
                    this.formValidationService.isBlank
                ]
            ],
        });
    };
    ReportDialogComponent.prototype.checkError = function (form, field, error) {
        return this.formValidationService.checkError(form, field, error);
    };
    ReportDialogComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.form.valid) {
            this.blockUIService.setBlockStatus(true);
            this.commonService.addReport(this.data.questionId, this.data.answerId, this.form.value).subscribe(function (res) {
                // this.socketsService.notify('createdData', {
                //   type: 'reports',
                //   data: res.data
                // });
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar.open(res.msg, 'Dismiss', {
                    duration: 1500
                })
                    .afterOpened()
                    .subscribe(function () {
                    _this.dialogRef.close(res.data);
                });
            }, function (err) {
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(err.error.msg, 'Dismiss', {
                    duration: 4000
                })
                    .afterDismissed()
                    .subscribe(function () {
                    _this.dialogRef.close();
                });
            });
        }
    };
    ReportDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-report-dialog',
            templateUrl: './report-dialog.component.html',
            styleUrls: ['./report-dialog.component.scss']
        }),
        __param(9, core_1.Optional()),
        __param(9, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            form_validation_service_1.FormValidationService,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            sockets_service_1.SocketsService,
            authentication_service_1.AuthenticationService,
            material_1.MatSnackBar,
            user_service_1.UserService,
            material_1.MatDialogRef, Object])
    ], ReportDialogComponent);
    return ReportDialogComponent;
}());
exports.ReportDialogComponent = ReportDialogComponent;
//# sourceMappingURL=report-dialog.component.js.map