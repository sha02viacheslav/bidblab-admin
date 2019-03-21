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
var authentication_service_1 = require("../../services/authentication.service");
var router_1 = require("@angular/router");
var flex_layout_1 = require("@angular/flex-layout");
var dialog_service_1 = require("../../services/dialog.service");
var login_component_1 = require("../login/login.component");
var signup_component_1 = require("../signup/signup.component");
var common_1 = require("@angular/common");
var environment_1 = require("../../../../environments/environment");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, location, authenticationService, media, dialogService
    //private media: ObservableMedia,
    ) {
        this.router = router;
        this.location = location;
        this.authenticationService = authenticationService;
        this.media = media;
        this.dialogService = dialogService;
        this.serverUrl = environment_1.environment.apiUrl;
        this.activeLinkIndex = -1;
        this.menuHidden = false;
        this.mainNavLinks = [
            {
                label: 'Members',
                link: '/members/memberlist',
                index: 0
            }, {
                label: 'Bid',
                link: '/questions/bid',
                index: 1
            }, {
                label: 'Blab',
                link: '/questions/blab',
                index: 2
            }, {
                label: 'About',
                link: '/questions/about',
                index: 3
            },
        ];
        this.accountNavLinks = [
            {
                label: 'Following',
                link: '/account/following',
                index: 0
            }, {
                label: 'My Questions',
                link: '/account/myquestions',
                index: 1
            }, {
                label: 'My answers',
                link: '/account/myanswers',
                index: 2
            }, {
                label: 'Credits',
                link: '/account/credits',
                index: 3
            },
            {
                label: 'Profile',
                link: '/account/profile',
                index: 3
            },
        ];
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUserUpdates();
        this.router.events.subscribe(function (res) {
            _this.activeLinkIndex = _this.mainNavLinks.indexOf(_this.mainNavLinks.find(function (tab) { return tab.link === '.' + _this.router.url; }));
        });
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.userUpdatesSubscription.unsubscribe();
    };
    HeaderComponent.prototype.toggleMenu = function () {
        this.menuHidden = !this.menuHidden;
    };
    HeaderComponent.prototype.closeMenu = function () {
        this.menuHidden = false;
    };
    HeaderComponent.prototype.isMediaActive = function (breakpoint) {
        return this.media.isActive(breakpoint);
    };
    HeaderComponent.prototype.isAuthenticated = function () {
        return this.authenticationService.isAdmin();
    };
    HeaderComponent.prototype.openDialog = function (componentName) {
        this.dialogService.open(componentName === 'login' ? login_component_1.LoginComponent : signup_component_1.SignupComponent);
    };
    HeaderComponent.prototype.openProfile = function () {
        this.router.navigateByUrl("/account");
    };
    HeaderComponent.prototype.goHome = function () {
        this.router.navigateByUrl('/');
    };
    HeaderComponent.prototype.goBack = function () {
        this.location.back();
    };
    HeaderComponent.prototype.isHome = function () {
        var path = this.location.path(false);
        return path === '' || path === '/questions/home';
    };
    HeaderComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.closeMenu();
    };
    HeaderComponent.prototype.getUserUpdates = function () {
        var _this = this;
        this.userUpdatesSubscription = this.authenticationService
            .getUserUpdates()
            .subscribe(function (user) { return (_this.user = user); });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            common_1.Location,
            authentication_service_1.AuthenticationService,
            flex_layout_1.ObservableMedia,
            dialog_service_1.DialogService
            //private media: ObservableMedia,
        ])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map