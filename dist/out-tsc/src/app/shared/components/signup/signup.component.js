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
var forms_1 = require("@angular/forms");
var form_validation_service_1 = require("../../services/form-validation.service");
var block_ui_service_1 = require("../../services/block-ui.service");
var material_1 = require("@angular/material");
var common_service_1 = require("../../services/common.service");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(fb, formValidationService, blockUIService, commonService, snackBar, dialogRef) {
        this.fb = fb;
        this.formValidationService = formValidationService;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.passwordVisibility = false;
        this.submitted = false;
        this.form = this.fb.group({
            accept: false,
            firstName: ['', [forms_1.Validators.required, this.formValidationService.isBlank]],
            lastName: ['', [forms_1.Validators.required, this.formValidationService.isBlank]],
            birthday: ['', [forms_1.Validators.required, this.formValidationService.isAdault]],
            username: ['', [forms_1.Validators.required, this.formValidationService.isBlank]],
            email: [
                '',
                [
                    forms_1.Validators.required,
                    this.formValidationService.isBlank,
                    forms_1.Validators.email
                ]
            ],
            password: [
                '',
                [
                    forms_1.Validators.required,
                    this.formValidationService.isBlank,
                    forms_1.Validators.minLength(8)
                ]
            ],
            confirmPassword: [
                '',
                [
                    forms_1.Validators.required,
                    this.formValidationService.isBlank,
                    this.formValidationService.arePasswordsMismatching
                ]
            ]
        });
    };
    SignupComponent.prototype.checkError = function (form, field, error) {
        return this.formValidationService.checkError(form, field, error);
    };
    SignupComponent.prototype.togglePasswordVisibility = function (event) {
        if (event.type === 'mouseleave' && !this.passwordVisibility) {
            return event.preventDefault();
        }
        this.passwordVisibility = !this.passwordVisibility;
        return event.preventDefault();
    };
    SignupComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.form.valid) {
            this.submitted = true;
            this.blockUIService.setBlockStatus(true);
            this.commonService.signup(this.form.value).subscribe(function (res) {
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(res.msg, 'Dismiss', {
                    duration: 1500
                })
                    .afterOpened()
                    .subscribe(function () {
                    _this.dialogRef.close();
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
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            form_validation_service_1.FormValidationService,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            material_1.MatDialogRef])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map