"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var header_component_1 = require("./components/header/header.component");
var footer_component_1 = require("./components/footer/footer.component");
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var router_1 = require("@angular/router");
var signup_component_1 = require("./components/signup/signup.component");
var login_component_1 = require("./components/login/login.component");
var forms_1 = require("@angular/forms");
var reset_password_component_1 = require("./components/reset-password/reset-password.component");
var question_dialog_component_1 = require("./components/question-dialog/question-dialog.component");
var answer_dialog_component_1 = require("./components/answer-dialog/answer-dialog.component");
var empty_component_1 = require("./components/empty/empty.component");
var question_box_component_1 = require("./components/question-box/question-box.component");
var alert_dialog_component_1 = require("./components/alert-dialog/alert-dialog.component");
var imageblock_component_1 = require("./components/imageblock/imageblock.component");
var account_nav_component_1 = require("./components/account-nav/account-nav.component");
var answer_box_component_1 = require("./components/answer-box/answer-box.component");
var follow_box_component_1 = require("./components/follow-box/follow-box.component");
var report_dialog_component_1 = require("./components/report-dialog/report-dialog.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                material_1.MatToolbarModule,
                material_1.MatButtonModule,
                material_1.MatMenuModule,
                material_1.MatIconModule,
                material_1.MatDialogModule,
                material_1.MatInputModule,
                material_1.MatSnackBarModule,
                material_1.MatChipsModule,
                material_1.MatCheckboxModule,
                material_1.MatSidenavModule,
                material_1.MatListModule,
                material_1.MatTabsModule,
                router_1.RouterModule,
                material_1.MatRadioModule,
                material_1.MatDatepickerModule,
                material_1.MatButtonToggleModule,
                material_1.MatNativeDateModule,
            ],
            declarations: [
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                reset_password_component_1.ResetPasswordComponent,
                answer_dialog_component_1.AnswerDialogComponent,
                question_dialog_component_1.QuestionDialogComponent,
                empty_component_1.EmptyComponent,
                question_box_component_1.QuestionBoxComponent,
                alert_dialog_component_1.AlertDialogComponent,
                imageblock_component_1.ImageblockComponent,
                account_nav_component_1.AccountNavComponent,
                answer_box_component_1.AnswerBoxComponent,
                follow_box_component_1.FollowBoxComponent,
                report_dialog_component_1.ReportDialogComponent
            ],
            entryComponents: [
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                reset_password_component_1.ResetPasswordComponent,
                answer_dialog_component_1.AnswerDialogComponent,
                alert_dialog_component_1.AlertDialogComponent,
                imageblock_component_1.ImageblockComponent,
                question_dialog_component_1.QuestionDialogComponent,
                report_dialog_component_1.ReportDialogComponent,
            ],
            exports: [
                flex_layout_1.FlexLayoutModule,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                question_box_component_1.QuestionBoxComponent,
                imageblock_component_1.ImageblockComponent,
                account_nav_component_1.AccountNavComponent,
                answer_box_component_1.AnswerBoxComponent,
                follow_box_component_1.FollowBoxComponent,
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map