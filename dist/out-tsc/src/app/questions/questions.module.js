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
var questions_component_1 = require("./questions.component");
var shared_module_1 = require("../shared/shared.module");
var questions_routing_module_1 = require("./questions-routing.module");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var question_detail_component_1 = require("./question-detail/question-detail.component");
var home_component_1 = require("./home/home.component");
var blab_component_1 = require("./blab/blab.component");
var bid_component_1 = require("./bid/bid.component");
var about_component_1 = require("./about/about.component");
var QuestionsModule = /** @class */ (function () {
    function QuestionsModule() {
    }
    QuestionsModule = __decorate([
        core_1.NgModule({
            imports: [
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
                shared_module_1.SharedModule,
                questions_routing_module_1.QuestionsRoutingModule
            ],
            declarations: [questions_component_1.QuestionsComponent, question_detail_component_1.QuestionDetailComponent, home_component_1.HomeComponent, blab_component_1.BlabComponent, bid_component_1.BidComponent, about_component_1.AboutComponent]
        })
    ], QuestionsModule);
    return QuestionsModule;
}());
exports.QuestionsModule = QuestionsModule;
//# sourceMappingURL=questions.module.js.map