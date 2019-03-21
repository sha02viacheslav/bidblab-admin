"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var auth_interceptor_1 = require("./auth.interceptor");
var ng_block_ui_1 = require("ng-block-ui");
var material_1 = require("@angular/material");
var service_worker_1 = require("@angular/service-worker");
var environment_1 = require("../environments/environment");
var shared_module_1 = require("./shared/shared.module");
var keycodes_1 = require("@angular/cdk/keycodes");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                shared_module_1.SharedModule,
                ng_block_ui_1.BlockUIModule.forRoot(),
                service_worker_1.ServiceWorkerModule.register('/ngsw-worker.js', {
                    enabled: environment_1.environment.production
                }),
                app_routing_module_1.AppRoutingModule,
            ],
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: '/' },
                {
                    provide: material_1.MAT_DIALOG_DEFAULT_OPTIONS,
                    useValue: { disableClose: true, autoFocus: true, hasBackdrop: true }
                },
                {
                    provide: material_1.MAT_CHIPS_DEFAULT_OPTIONS,
                    useValue: {
                        separatorKeyCodes: [keycodes_1.ENTER, keycodes_1.COMMA]
                    }
                },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth_interceptor_1.AuthInterceptor,
                    multi: true
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map