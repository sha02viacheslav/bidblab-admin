"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
var environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
require("hammerjs");
platform_browser_dynamic_1.platformBrowserDynamic()
    .bootstrapModule(app_module_1.AppModule)
    .then(function (bootstrapModule) {
    // TODO: Remove when https://github.com/angular/angular-cli/issues/8779 is fixed?
    if ('serviceWorker' in navigator &&
        'PushManager' in window &&
        environment_1.environment.production) {
        navigator.serviceWorker
            .register('/ngsw-worker.js')
            .catch(function (err) { return console.error('Cannot register service worker.', err); });
    }
    return bootstrapModule;
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map