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
var material_1 = require("@angular/material");
var form_validation_service_1 = require("../../shared/services/form-validation.service");
var block_ui_service_1 = require("../../shared/services/block-ui.service");
var authentication_service_1 = require("../../shared/services/authentication.service");
var user_service_1 = require("../../shared/services/user.service");
var dialog_service_1 = require("../../shared/services/dialog.service");
var login_component_1 = require("../../shared/components/login/login.component");
var common_service_1 = require("../../shared/services/common.service");
var environment_1 = require("../../../environments/environment");
var flex_layout_1 = require("@angular/flex-layout");
var ProfileComponent = /** @class */ (function () {
    //customTag: string;;
    function ProfileComponent(fb, formValidationService, authenticationService, blockUIService, userService, snackBar, dialogService, commonService, media) {
        this.fb = fb;
        this.formValidationService = formValidationService;
        this.authenticationService = authenticationService;
        this.blockUIService = blockUIService;
        this.userService = userService;
        this.snackBar = snackBar;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.media = media;
        this.serverUrl = environment_1.environment.apiUrl;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.isInit = false;
        this.isAuthenticated();
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        if (this.isInit) {
            this.userUpdatesSubscription.unsubscribe();
        }
    };
    ProfileComponent.prototype.initialize = function () {
        var _this = this;
        this.isInit = true;
        this.getUserUpdates();
        this.passwordVisibility = false;
        this.disabled = true;
        this.submitted = false;
        this.infoForm = this.fb.group({
            firstName: [
                this.user.firstName,
                [forms_1.Validators.required, this.formValidationService.isBlank]
            ],
            lastName: [
                this.user.lastName,
                [forms_1.Validators.required, this.formValidationService.isBlank]
            ],
            username: [
                this.user.username,
                [forms_1.Validators.required, this.formValidationService.isBlank]
            ],
            email: [
                this.user.email,
                [
                    forms_1.Validators.required,
                    this.formValidationService.isBlank,
                    forms_1.Validators.email
                ]
            ],
            aboutme: [
                this.user.aboutme,
            ],
            phone: [
                this.user.phone,
            ],
            customTag: [
                '',
            ],
            tags: this.fb.array([]),
            birthday: [
                new Date(this.user.birthday),
            ],
            gender: [
                this.user.gender,
            ],
            physicaladdress: [
                this.user.physicaladdress,
            ],
            physicalcity: [
                this.user.physicalcity,
            ],
            physicalstate: [
                this.user.physicalstate,
            ],
            physicalzipcode: [
                this.user.physicalzipcode,
            ],
            shippingaddress: [
                this.user.shippingaddress,
            ],
            shippingcity: [
                this.user.shippingcity,
            ],
            shippingstate: [
                this.user.shippingstate,
            ],
            shippingzipcode: [
                this.user.shippingzipcode,
            ],
        });
        var observable = this.commonService.getStandardInterests();
        observable.subscribe(function (res) {
            _this.standardInterests = res.data;
            _this.formArray = _this.infoForm.get('tags');
            _this.user.tags.forEach(function (item) {
                if (!_this.standardInterests.some(function (x) { return x == item; })) {
                    _this.standardInterests.push(item);
                }
                ;
            });
            _this.standardInterests.forEach(function (item) {
                if (_this.user.tags.some(function (interest) {
                    return interest &&
                        interest === item;
                })) {
                    _this.formArray.push(new forms_1.FormControl(true));
                }
                else {
                    _this.formArray.push(new forms_1.FormControl(false));
                }
            });
            _this.blockUIService.setBlockStatus(false);
            _this.snackBar.open(res.msg, 'Dismiss', {
                duration: 1500
            });
        }, function (err) {
            _this.blockUIService.setBlockStatus(false);
            _this.snackBar.open(err.error.msg, 'Dismiss', {
                duration: 1500
            });
        });
        this.passwordForm = this.fb.group({
            currentPassword: [
                '',
                [
                    forms_1.Validators.required,
                    this.formValidationService.isBlank,
                    forms_1.Validators.minLength(8)
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
    ProfileComponent.prototype.addCustomTag = function () {
        var _this = this;
        event.preventDefault();
        if (this.infoForm.value.customTag) {
            if (this.standardInterests.find(function (x) { return x == _this.infoForm.value.customTag; })) {
                this.infoForm.controls.customTag.setValue('');
            }
            else {
                this.standardInterests.push(this.infoForm.value.customTag);
                this.formArray.push(new forms_1.FormControl(true));
                this.infoForm.controls.customTag.setValue('');
            }
        }
    };
    ProfileComponent.prototype.isAuthenticated = function () {
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
    ProfileComponent.prototype.isMediaActive = function (breakpoint) {
        return this.media.isActive(breakpoint);
    };
    ProfileComponent.prototype.checkError = function (form, field, error) {
        return this.formValidationService.checkError(form, field, error);
    };
    ProfileComponent.prototype.togglePasswordVisibility = function (event) {
        if (event.type === 'mouseleave' && !this.passwordVisibility) {
            return event.preventDefault();
        }
        this.passwordVisibility = !this.passwordVisibility;
        return event.preventDefault();
    };
    ProfileComponent.prototype.onFileChanged = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var uploadData = new FormData();
        uploadData.append('file', file, file.name);
        this.blockUIService.setBlockStatus(true);
        this.userService.changeProfilePicture(uploadData).subscribe(function (res) {
            _this.blockUIService.setBlockStatus(false);
            _this.authenticationService.setUser(Object.assign(_this.user, {
                profilePicture: res.data
            }));
            _this.snackBar.open(res.msg, 'Dismiss', {
                duration: 1500
            });
        }, function (err) {
            _this.blockUIService.setBlockStatus(false);
            _this.snackBar.open(err.error.msg, 'Dismiss', {
                duration: 4000
            });
        });
    };
    ProfileComponent.prototype.submitInfoForm = function () {
        var _this = this;
        if (this.infoForm.valid) {
            var formValue = Object.assign({}, this.infoForm.value, {
                tags: this.standardInterests
                    .filter(function (x, i) { return !!_this.infoForm.value.tags[i]; })
            });
            this.submitted = true;
            this.blockUIService.setBlockStatus(true);
            this.userService.updateProfile(formValue).subscribe(function (res) {
                _this.authenticationService.setUser(res.data);
                _this.blockUIService.setBlockStatus(false);
                _this.submitted = true;
                _this.snackBar.open(res.msg, 'Dismiss', {
                    duration: 1500
                });
            }, function (err) {
                _this.submitted = false;
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar.open(err.error.msg, 'Dismiss', {
                    duration: 4000
                });
            });
        }
    };
    ProfileComponent.prototype.submitPasswordForm = function (formDirective) {
        var _this = this;
        if (this.passwordForm.valid) {
            this.submitted = true;
            this.blockUIService.setBlockStatus(true);
            this.userService.changePassword(this.passwordForm.value).subscribe(function (res) {
                _this.blockUIService.setBlockStatus(false);
                _this.passwordForm.reset();
                formDirective.resetForm();
                _this.submitted = false;
                _this.snackBar.open(res.msg, 'Dismiss', {
                    duration: 1500
                });
            }, function (err) {
                _this.submitted = false;
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar.open(err.error.msg, 'Dismiss', {
                    duration: 4000
                });
            });
        }
    };
    ProfileComponent.prototype.getUserUpdates = function () {
        var _this = this;
        this.userUpdatesSubscription = this.authenticationService
            .getUserUpdates()
            .subscribe(function (user) { return (_this.user = user); });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            form_validation_service_1.FormValidationService,
            authentication_service_1.AuthenticationService,
            block_ui_service_1.BlockUIService,
            user_service_1.UserService,
            material_1.MatSnackBar,
            dialog_service_1.DialogService,
            common_service_1.CommonService,
            flex_layout_1.ObservableMedia])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map