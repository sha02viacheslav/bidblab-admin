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
var authentication_service_1 = require("../services/authentication.service");
var UserGuard = /** @class */ (function () {
    function UserGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    UserGuard.prototype.canLoad = function (route) {
        if (!this.authenticationService.isAdmin()) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    };
    UserGuard.prototype.canActivate = function (route, state) {
        if (!this.authenticationService.isAdmin()) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    };
    UserGuard.prototype.canActivateChild = function (childRoute, state) {
        if (!this.authenticationService.isAdmin()) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    };
    UserGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            authentication_service_1.AuthenticationService])
    ], UserGuard);
    return UserGuard;
}());
exports.UserGuard = UserGuard;
//# sourceMappingURL=user.guard.js.map