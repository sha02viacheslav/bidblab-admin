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
var gateway_component_1 = require("./gateway.component");
var verify_account_component_1 = require("./verify-account/verify-account.component");
var routes = [
    {
        path: '',
        component: gateway_component_1.GatewayComponent,
        children: [
            { path: 'verifyAccount/:verificationToken', component: verify_account_component_1.VerifyAccountComponent },
            { path: '**', redirectTo: '' }
        ]
    }
];
var GatewayRoutingModule = /** @class */ (function () {
    function GatewayRoutingModule() {
    }
    GatewayRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], GatewayRoutingModule);
    return GatewayRoutingModule;
}());
exports.GatewayRoutingModule = GatewayRoutingModule;
//# sourceMappingURL=gateway-routing.module.js.map