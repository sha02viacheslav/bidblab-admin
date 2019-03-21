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
var user_component_1 = require("./user.component");
var shared_module_1 = require("../shared/shared.module");
var user_routing_module_1 = require("./user-routing.module");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MatButtonModule,
                material_1.MatInputModule,
                material_1.MatSnackBarModule,
                material_1.MatCardModule,
                material_1.MatIconModule,
                material_1.MatSelectModule,
                material_1.MatChipsModule,
                material_1.MatTabsModule,
                shared_module_1.SharedModule,
                user_routing_module_1.UserRoutingModule
            ],
            declarations: [user_component_1.UserComponent],
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map