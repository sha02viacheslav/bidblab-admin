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
var QuestionDialogComponent = /** @class */ (function () {
    function QuestionDialogComponent(fb, formValidationService, blockUIService, commonService, socketsService, authenticationService, snackBar, userService, dialogRef, data) {
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
    QuestionDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.catagories = [];
        this.getUserUpdates();
        this.submitted = false;
        this.infoForm = this.fb.group({
            title: [
                this.data.question ? this.data.question.title : (this.data.newTitle ? this.data.newTitle : ''),
                [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(500),
                    this.formValidationService.isBlank
                ]
            ],
            tag: '',
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
            // this.standardInterests.forEach( item => {
            //   this.formArray.push(new FormControl(false));          
            // });
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
    };
    QuestionDialogComponent.prototype.ngOnDestroy = function () {
        this.userUpdatesSubscription.unsubscribe();
    };
    QuestionDialogComponent.prototype.checkError = function (form, field, error) {
        return this.formValidationService.checkError(form, field, error);
    };
    QuestionDialogComponent.prototype.getTags = function () {
        return this.infoForm.get('tags').controls;
    };
    QuestionDialogComponent.prototype.getUserUpdates = function () {
        var _this = this;
        this.userUpdatesSubscription = this.authenticationService
            .getUserUpdates()
            .subscribe(function (user) { return (_this.user = user); });
    };
    QuestionDialogComponent.prototype.onFileChanged = function (event, input) {
        var _this = this;
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size > 1024 * 1024) {
                this.snackBar.open("Image size is limited to 1MBytes.", 'Dismiss', {
                    duration: 3000
                });
            }
            else {
                this.uploadData = new FormData();
                this.uploadData.append('file', event.target.files[0], event.target.files[0].name);
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.questionPictureurl = reader.result;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    };
    QuestionDialogComponent.prototype.uploadpicture = function () {
        var _this = this;
        this.commonService.changeQuestionPicture(this.uploadData).subscribe(function (res) {
            _this.socketsService.notify('createdData', {
                type: 'question',
                data: res.data
            });
            _this.blockUIService.setBlockStatus(false);
            _this.snackBar.open(res.msg, 'Dismiss', {
                duration: 1500
            })
                .afterOpened()
                .subscribe(function () {
                _this.submitted = true;
                _this.dialogRef.close(res.data);
            });
        }, function (err) {
            _this.blockUIService.setBlockStatus(false);
            _this.snackBar.open(err.error.msg, 'Dismiss', {
                duration: 1500
            });
        });
    };
    QuestionDialogComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.infoForm.valid) {
            this.blockUIService.setBlockStatus(true);
            if (this.data.question) {
                this.commonService
                    .updateQuestion(this.data.question._id, this.infoForm.value)
                    .subscribe(function (res) {
                    _this.socketsService.notify('updatedData', {
                        type: 'question',
                        data: res.data
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
            else {
                this.commonService.addQuestion(this.infoForm.value).subscribe(function (res) {
                    ////////////////////////////////////////
                    if (_this.uploadData) {
                        _this.uploadData.append('questionId', res.data._id);
                        _this.uploadpicture();
                    }
                    else {
                        _this.socketsService.notify('createdData', {
                            type: 'question',
                            data: res.data
                        });
                        _this.blockUIService.setBlockStatus(false);
                        _this.snackBar.open(res.msg, 'Dismiss', {
                            duration: 1500
                        })
                            .afterOpened()
                            .subscribe(function () {
                            _this.submitted = true;
                            _this.dialogRef.close(res.data);
                        });
                    }
                    ////////////////////////////////////////  
                }, function (err) {
                    _this.submitted = false;
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
        }
    };
    QuestionDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-question-dialog',
            templateUrl: './question-dialog.component.html',
            styleUrls: ['./question-dialog.component.scss']
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
    ], QuestionDialogComponent);
    return QuestionDialogComponent;
}());
exports.QuestionDialogComponent = QuestionDialogComponent;
//# sourceMappingURL=question-dialog.component.js.map