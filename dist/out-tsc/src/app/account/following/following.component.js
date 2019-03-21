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
var dialog_service_1 = require("../../shared/services/dialog.service");
var common_service_1 = require("../../shared/services/common.service");
var material_1 = require("@angular/material");
var authentication_service_1 = require("../../shared/services/authentication.service");
var block_ui_service_1 = require("../../shared/services/block-ui.service");
var login_component_1 = require("../../shared/components/login/login.component");
var flex_layout_1 = require("@angular/flex-layout");
require("rxjs/add/operator/takeWhile");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var environment_1 = require("../../../environments/environment");
var FollowingComponent = /** @class */ (function () {
    function FollowingComponent(observableMedia, blockUIService, commonService, snackBar, authenticationService, dialogService) {
        this.observableMedia = observableMedia;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
        this.followingQuestions = [];
        this.followingUsers = [];
        this.serverUrl = environment_1.environment.apiUrl;
    }
    FollowingComponent.prototype.ngOnInit = function () {
        this.isInit = false;
        this.isAuthenticated();
    };
    FollowingComponent.prototype.initialize = function () {
        var _this = this;
        this.isInit = true;
        this.followingQuestionsCount = 0;
        this.followingUsersCount = 0;
        this.blockUIService.setBlockStatus(true);
        var observableQuestion = this.commonService.getQuestionsFollowing();
        observableQuestion.subscribe(function (res) {
            _this.followingQuestionsCount = res.data.count;
            _this.followingQuestions = res.data.questions;
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
        var observableUser = this.commonService.getUsersFollowing();
        observableUser.subscribe(function (res) {
            _this.followingUsersCount = res.data.count;
            _this.followingUsers = res.data.users;
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
    FollowingComponent.prototype.isAuthenticated = function () {
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
    FollowingComponent.prototype.deleteFollow = function (followType, objectId) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        if (objectId && this.authenticationService.getUser()._id) {
            this.commonService
                .deleteFollow(followType, objectId)
                .subscribe(function (res) {
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(res.msg, 'Dismiss', {
                    duration: 1500
                })
                    .afterOpened()
                    .subscribe(function () {
                    if (followType == 'question') {
                        var index = _this.followingQuestions.findIndex(function (currentQuestion) { return currentQuestion._id === objectId; });
                        if (index !== -1) {
                            _this.followingQuestions.splice(index, 1);
                        }
                    }
                    else {
                        var index = _this.followingUsers.findIndex(function (currentUser) { return currentUser._id === objectId; });
                        if (index !== -1) {
                            _this.followingUsers.splice(index, 1);
                        }
                    }
                });
            }, function (err) {
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
    FollowingComponent = __decorate([
        core_1.Component({
            selector: 'app-following',
            templateUrl: './following.component.html',
            styleUrls: ['./following.component.scss']
        }),
        __metadata("design:paramtypes", [flex_layout_1.ObservableMedia,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService])
    ], FollowingComponent);
    return FollowingComponent;
}());
exports.FollowingComponent = FollowingComponent;
//# sourceMappingURL=following.component.js.map