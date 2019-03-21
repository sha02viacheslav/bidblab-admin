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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var authentication_service_1 = require("./shared/services/authentication.service");
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var authReq = req.clone({
            headers: req.headers.set('Authorization', this.authenticationService.getToken() || '')
        });
        return next.handle(authReq).pipe(operators_1.catchError(function (err) {
            if (err.status === 401 &&
                err.error.msg === 'Login timed out, please login again.') {
                _this.authenticationService.logout();
            }
            return rxjs_1.throwError(err);
        }));
    };
    AuthInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
//# sourceMappingURL=auth.interceptor.js.map