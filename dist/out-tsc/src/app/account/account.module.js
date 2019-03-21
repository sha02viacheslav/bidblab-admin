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
var account_routing_module_1 = require("./account-routing.module");
var account_component_1 = require("./account.component");
var shared_module_1 = require("../shared/shared.module");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var following_component_1 = require("./following/following.component");
var myquestions_component_1 = require("./myquestions/myquestions.component");
var myanswers_component_1 = require("./myanswers/myanswers.component");
var credits_component_1 = require("./credits/credits.component");
var profile_component_1 = require("./profile/profile.component");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatBadgeModule,
                material_1.MatBottomSheetModule,
                material_1.MatButtonToggleModule,
                material_1.MatStepperModule,
                material_1.MatDialogModule,
                material_1.MatExpansionModule,
                material_1.MatGridListModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatNativeDateModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                material_1.MatTreeModule,
                forms_1.ReactiveFormsModule,
                material_1.MatInputModule,
                material_1.MatTabsModule,
                material_1.MatButtonModule,
                material_1.MatDatepickerModule,
                material_1.MatCheckboxModule,
                material_1.MatIconModule,
                material_1.MatSnackBarModule,
                material_1.MatCardModule,
                material_1.MatChipsModule,
                material_1.MatAutocompleteModule,
                material_1.MatPaginatorModule,
                material_1.MatDividerModule,
                shared_module_1.SharedModule,
                account_routing_module_1.AccountRoutingModule,
            ],
            declarations: [account_component_1.AccountComponent, following_component_1.FollowingComponent, myquestions_component_1.MyquestionsComponent, myanswers_component_1.MyanswersComponent, credits_component_1.CreditsComponent, profile_component_1.ProfileComponent],
            exports: [
                account_component_1.AccountComponent
            ]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map