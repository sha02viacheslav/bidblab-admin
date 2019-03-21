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
var CreditsComponent = /** @class */ (function () {
    function CreditsComponent(blockUIService, commonService, snackBar, authenticationService, dialogService) {
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
    }
    CreditsComponent.prototype.ngOnInit = function () {
        this.isInit = false;
        this.isAuthenticated();
    };
    CreditsComponent.prototype.initialize = function () {
        var _this = this;
        this.isInit = true;
        this.question_credits = 0;
        this.answer_credits = 0;
        this.referal_credits = 0;
        this.total_credits = this.question_credits + this.answer_credits + this.referal_credits;
        this.blockUIService.setBlockStatus(false);
        var observable = this.commonService.getMyCredits();
        observable.subscribe(function (res) {
            _this.question_credits = res.data.question_credits;
            _this.answer_credits = res.data.answer_credits;
            _this.referal_credits = res.data.referal_credits;
            _this.total_credits = _this.question_credits + _this.answer_credits + _this.referal_credits;
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
    CreditsComponent.prototype.isAuthenticated = function () {
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
    CreditsComponent = __decorate([
        core_1.Component({
            selector: 'app-credits',
            templateUrl: './credits.component.html',
            styleUrls: ['./credits.component.scss']
        }),
        __metadata("design:paramtypes", [block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService])
    ], CreditsComponent);
    return CreditsComponent;
}());
exports.CreditsComponent = CreditsComponent;
//# sourceMappingURL=credits.component.js.map