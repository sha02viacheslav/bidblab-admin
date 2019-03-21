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
var AccountNavComponent = /** @class */ (function () {
    function AccountNavComponent(router) {
        this.router = router;
        this.activeLinkIndex = -1;
        this.navLinks = [
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
    AccountNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (res) {
            _this.activeLinkIndex = _this.navLinks.indexOf(_this.navLinks.find(function (tab) { return tab.link === '.' + _this.router.url; }));
        });
    };
    AccountNavComponent = __decorate([
        core_1.Component({
            selector: 'app-account-nav',
            templateUrl: './account-nav.component.html',
            styleUrls: ['./account-nav.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AccountNavComponent);
    return AccountNavComponent;
}());
exports.AccountNavComponent = AccountNavComponent;
//# sourceMappingURL=account-nav.component.js.map