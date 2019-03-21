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
var environment_1 = require("../../../environments/environment");
var MyanswersComponent = /** @class */ (function () {
    function MyanswersComponent(blockUIService, commonService, snackBar, authenticationService, dialogService, media) {
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
        this.media = media;
        this.serverUrl = environment_1.environment.apiUrl;
    }
    MyanswersComponent.prototype.ngOnInit = function () {
        this.isInit = false;
        this.isAuthenticated();
    };
    MyanswersComponent.prototype.initialize = function () {
        var _this = this;
        this.isInit = true;
        this.blockUIService.setBlockStatus(false);
        var observable = this.commonService.getQuestionsWithYourAnswers();
        observable.subscribe(function (res) {
            _this.totalQuestionsCount = res.data.count;
            _this.questionsWithYourAnswers = res.data.questionsWithYourAnswers;
            _this.sortQuestionsByMyAnswerCredit(_this.questionsWithYourAnswers);
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
    MyanswersComponent.prototype.sortQuestionsByMyAnswerCredit = function (questions) {
        questions.sort(function (a, b) {
            var temp1 = a.answers[0].credit;
            var temp2 = b.answers[0].credit;
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
    MyanswersComponent.prototype.isMediaActive = function (breakpoint) {
        return this.media.isActive(breakpoint);
    };
    MyanswersComponent.prototype.isAuthenticated = function () {
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
    MyanswersComponent = __decorate([
        core_1.Component({
            selector: 'app-myanswers',
            templateUrl: './myanswers.component.html',
            styleUrls: ['./myanswers.component.scss']
        }),
        __metadata("design:paramtypes", [block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService,
            flex_layout_1.ObservableMedia])
    ], MyanswersComponent);
    return MyanswersComponent;
}());
exports.MyanswersComponent = MyanswersComponent;
//# sourceMappingURL=myanswers.component.js.map