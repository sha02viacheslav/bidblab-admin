"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_component_1 = require("./account.component");
var following_component_1 = require("./following/following.component");
var myquestions_component_1 = require("./myquestions/myquestions.component");
var myanswers_component_1 = require("./myanswers/myanswers.component");
var credits_component_1 = require("./credits/credits.component");
var profile_component_1 = require("./profile/profile.component");
var routes = [
    {
        path: '',
        component: account_component_1.AccountComponent,
        children: [
            { path: 'following', component: following_component_1.FollowingComponent },
            { path: 'myquestions', component: myquestions_component_1.MyquestionsComponent },
            { path: 'myanswers', component: myanswers_component_1.MyanswersComponent },
            { path: 'credits', component: credits_component_1.CreditsComponent },
            { path: 'profile', component: profile_component_1.ProfileComponent },
            { path: '**', redirectTo: '' }
        ]
    }
];
var AccountRoutingModule = /** @class */ (function () {
    function AccountRoutingModule() {
    }
    AccountRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AccountRoutingModule);
    return AccountRoutingModule;
}());
exports.AccountRoutingModule = AccountRoutingModule;
//# sourceMappingURL=account-routing.module.js.map