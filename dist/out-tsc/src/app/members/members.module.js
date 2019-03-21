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
var members_routing_module_1 = require("./members-routing.module");
var members_component_1 = require("./members.component");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var members_list_component_1 = require("./members-list/members-list.component");
var MembersModule = /** @class */ (function () {
    function MembersModule() {
    }
    MembersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MatInputModule,
                material_1.MatButtonModule,
                material_1.MatIconModule,
                material_1.MatSnackBarModule,
                material_1.MatCardModule,
                material_1.MatChipsModule,
                material_1.MatAutocompleteModule,
                material_1.MatPaginatorModule,
                material_1.MatDividerModule,
                material_1.MatTableModule,
                material_1.MatSortModule,
                members_routing_module_1.MembersRoutingModule,
            ],
            declarations: [members_component_1.MembersComponent, members_list_component_1.MembersListComponent],
            exports: [
                material_1.MatSortModule,
                material_1.MatTableModule,
            ]
        })
    ], MembersModule);
    return MembersModule;
}());
exports.MembersModule = MembersModule;
//# sourceMappingURL=members.module.js.map