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
var ng_block_ui_1 = require("ng-block-ui");
var block_ui_service_1 = require("./shared/services/block-ui.service");
var service_worker_1 = require("@angular/service-worker");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var common_service_1 = require("./shared/services/common.service");
var material_1 = require("@angular/material");
var authentication_service_1 = require("./shared/services/authentication.service");
var dialog_service_1 = require("./shared/services/dialog.service");
var reset_password_component_1 = require("./shared/components/reset-password/reset-password.component");
var flex_layout_1 = require("@angular/flex-layout");
var AppComponent = /** @class */ (function () {
    function AppComponent(blockUIService, swUpdate, router, route, commonService, snackBar, authenticationService, dialogService, media) {
        this.blockUIService = blockUIService;
        this.swUpdate = swUpdate;
        this.router = router;
        this.route = route;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
        this.media = media;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getBlockStatus();
        this.checkForUpdates();
        this.routerSubscription = this.router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function () { return window.scrollTo(0, 0); });
        this.checkVerificationToken();
        this.checkResetPasswordToken();
    };
    AppComponent.prototype.checkVerificationToken = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            if (params.has('verificationToken')) {
                var token = params.get('verificationToken');
                _this.verifyAccount(token);
            }
        });
    };
    AppComponent.prototype.isMediaActive = function (breakpoint) {
        return this.media.isActive(breakpoint);
    };
    AppComponent.prototype.verifyAccount = function (token) {
        var _this = this;
        this.commonService.verifyAccount(token).subscribe(function (res) {
            _this.snackBar.open(res.msg, 'Dismiss');
            _this.router.navigateByUrl('/');
        }, function (err) {
            _this.snackBar.open(err.error.msg, 'Dismiss');
            _this.router.navigateByUrl('/');
        });
    };
    AppComponent.prototype.checkResetPasswordToken = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            if (params.has('resetPasswordToken')) {
                if (!_this.authenticationService.isAdmin()) {
                    var token_1 = params.get('resetPasswordToken');
                    _this.commonService.checkResetPasswordToken(token_1).subscribe(function (res) {
                        _this.openResetPasswordDialog(token_1, res.data);
                    }, function (err) {
                        _this.snackBar.open(err.error.msg, 'Dismiss');
                        _this.router.navigateByUrl('/');
                    });
                }
                else {
                    _this.snackBar.open('You are already logged in.', 'Dismiss');
                    _this.router.navigateByUrl('/');
                }
            }
        });
    };
    AppComponent.prototype.isAuthenticated = function () {
        return this.authenticationService.isAdmin();
    };
    AppComponent.prototype.openResetPasswordDialog = function (token, userId) {
        this.dialogService.open(reset_password_component_1.ResetPasswordComponent, {
            data: {
                token: token,
                userId: userId
            }
        });
    };
    AppComponent.prototype.getBlockStatus = function () {
        var _this = this;
        this.blockingSubscription = this.blockUIService
            .getBlockStatus()
            .subscribe(function (status) {
            if (status) {
                _this.blockUI.start();
            }
            else {
                _this.blockUI.stop();
            }
        });
    };
    AppComponent.prototype.checkForUpdates = function () {
        var _this = this;
        this.swUpdate.available
            .pipe(operators_1.takeWhile(function () { return _this.swUpdate.isEnabled; }))
            .subscribe(function () {
            if (confirm('A new version of the app is available. Update Now?')) {
                window.location.reload();
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
        this.blockingSubscription.unsubscribe();
    };
    __decorate([
        ng_block_ui_1.BlockUI(),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "blockUI", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [block_ui_service_1.BlockUIService,
            service_worker_1.SwUpdate,
            router_1.Router,
            router_1.ActivatedRoute,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService,
            flex_layout_1.ObservableMedia])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map