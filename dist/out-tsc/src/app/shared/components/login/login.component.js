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
var router_1 = require("@angular/router");
var jwtDecode = require("jwt-decode");
var authentication_service_1 = require("../../services/authentication.service");
var form_validation_service_1 = require("../../services/form-validation.service");
var block_ui_service_1 = require("../../services/block-ui.service");
var material_1 = require("@angular/material");
var common_service_1 = require("../../services/common.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, formValidationService, authenticationService, blockUIService, commonService, router, snackBar, dialogRef) {
        this.fb = fb;
        this.formValidationService = formValidationService;
        this.authenticationService = authenticationService;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.router = router;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.forgotMode = false;
        this.passwordVisibility = false;
        this.submitted = false;
        this.loginForm = this.fb.group({
            username: ['', [forms_1.Validators.required, this.formValidationService.isBlank]],
            password: ['', forms_1.Validators.required]
        });
        this.forgotForm = this.fb.group({
            email: [
                '',
                [
                    forms_1.Validators.required,
                    this.formValidationService.isBlank,
                    forms_1.Validators.email
                ]
            ]
        });
    };
    LoginComponent.prototype.checkError = function (form, field, error) {
        return this.formValidationService.checkError(form, field, error);
    };
    LoginComponent.prototype.togglePasswordVisibility = function (event) {
        if (!(event.type === 'mouseleave' && !this.passwordVisibility)) {
            this.passwordVisibility = !this.passwordVisibility;
        }
        return event.preventDefault();
    };
    LoginComponent.prototype.adminLogin = function () {
        var _this = this;
        this.commonService.adminLogin(this.loginForm.value).subscribe(function (res) {
            _this.authenticationService.setToken(res.data);
            _this.authenticationService.setUser(jwtDecode(res.data).user);
            localStorage.setItem('jwt', res.data);
            localStorage.setItem('user', JSON.stringify(_this.authenticationService.getUser()));
            _this.blockUIService.setBlockStatus(false);
            _this.snackBar
                .open(res.msg, 'Dismiss', {
                duration: 1000
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
    };
    LoginComponent.prototype.forgotPassword = function () {
        var _this = this;
        this.commonService.forgotPassword(this.forgotForm.value).subscribe(function (res) {
            _this.blockUIService.setBlockStatus(false);
            _this.snackBar
                .open(res.msg, 'Dismiss')
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
    };
    LoginComponent.prototype.toggleForgotMode = function () {
        this.forgotMode = !this.forgotMode;
    };
    LoginComponent.prototype.submitForm = function () {
        var form = this.forgotMode ? this.forgotForm : this.loginForm;
        if (form.valid) {
            this.submitted = true;
            this.blockUIService.setBlockStatus(true);
            if (this.forgotMode) {
                this.forgotPassword();
            }
            else {
                this.adminLogin();
            }
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            form_validation_service_1.FormValidationService,
            authentication_service_1.AuthenticationService,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            router_1.Router,
            material_1.MatSnackBar,
            material_1.MatDialogRef])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map