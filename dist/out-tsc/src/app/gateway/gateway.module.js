"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var gateway_routing_module_1 = require("./gateway-routing.module");
var verify_account_component_1 = require("./verify-account/verify-account.component");
var gateway_component_1 = require("./gateway.component");
var GatewayModule = /** @class */ (function () {
    function GatewayModule() {
    }
    GatewayModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                gateway_routing_module_1.GatewayRoutingModule
            ],
            declarations: [verify_account_component_1.VerifyAccountComponent, gateway_component_1.GatewayComponent],
            exports: [
                gateway_component_1.GatewayComponent
            ]
        })
    ], GatewayModule);
    return GatewayModule;
}());
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map