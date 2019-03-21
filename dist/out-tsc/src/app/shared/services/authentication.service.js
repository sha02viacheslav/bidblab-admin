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
var rxjs_1 = require("rxjs");
var jwtDecode = require("jwt-decode");
var router_1 = require("@angular/router");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(router) {
        this.router = router;
        this.token = localStorage.getItem('jwt');
        var user = JSON.parse(localStorage.getItem('user')) ||
            (this.token ? jwtDecode(this.token).user : null);
        this.userSubject = new rxjs_1.BehaviorSubject(user);
    }
    AuthenticationService.prototype.getToken = function () {
        return this.token;
    };
    AuthenticationService.prototype.setToken = function (token) {
        this.token = token;
    };
    AuthenticationService.prototype.getUser = function () {
        return this.userSubject.getValue();
    };
    AuthenticationService.prototype.getUserUpdates = function () {
        return this.userSubject.asObservable();
    };
    AuthenticationService.prototype.setUser = function (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.token != null && this.getUser() != null;
    };
    AuthenticationService.prototype.isAdmin = function () {
        return this.isAuthenticated() && jwtDecode(this.token).admin;
    };
    AuthenticationService.prototype.logout = function () {
        this.token = null;
        this.userSubject.next(null);
        localStorage.clear();
        this.router.navigateByUrl('/');
    };
    AuthenticationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map