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
var router_1 = require("@angular/router");
var common_service_1 = require("../../shared/services/common.service");
var block_ui_service_1 = require("../../shared/services/block-ui.service");
var material_1 = require("@angular/material");
var authentication_service_1 = require("../../shared/services/authentication.service");
var jwtDecode = require("jwt-decode");
var VerifyAccountComponent = /** @class */ (function () {
    function VerifyAccountComponent(route, commonService, blockUIService, snackBar, authenticationService) {
        this.route = route;
        this.commonService = commonService;
        this.blockUIService = blockUIService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
    }
    VerifyAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.verified = false;
        this.blockUIService.setBlockStatus(true);
        this.route.paramMap.subscribe(function (params) {
            if (params.has('verificationToken')) {
                var verificationToken = params.get('verificationToken');
                _this.commonService.verifyAccount(verificationToken).subscribe(function (res) {
                    _this.snackBar
                        .open(res.msg, 'Dismiss', {
                        duration: 1500
                    })
                        .afterOpened()
                        .subscribe(function () {
                        _this.authenticationService.setToken(res.data);
                        _this.authenticationService.setUser(jwtDecode(res.data).user);
                        localStorage.setItem('jwt', res.data);
                        localStorage.setItem('user', JSON.stringify(_this.authenticationService.getUser()));
                        _this.blockUIService.setBlockStatus(false);
                        _this.commonService.goHome();
                    });
                }, function (err) {
                    _this.snackBar
                        .open(err.error.msg, 'Dismiss', {
                        duration: 4000
                    })
                        .afterDismissed()
                        .subscribe(function () {
                        _this.blockUIService.setBlockStatus(false);
                        _this.commonService.goHome();
                    });
                });
            }
        });
    };
    VerifyAccountComponent = __decorate([
        core_1.Component({
            selector: 'app-verify-account',
            templateUrl: './verify-account.component.html',
            styleUrls: ['./verify-account.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_service_1.CommonService,
            block_ui_service_1.BlockUIService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService])
    ], VerifyAccountComponent);
    return VerifyAccountComponent;
}());
exports.VerifyAccountComponent = VerifyAccountComponent;
//# sourceMappingURL=verify-account.component.js.map