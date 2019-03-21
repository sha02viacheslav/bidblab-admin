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
var questions_component_1 = require("./questions.component");
var question_detail_component_1 = require("./question-detail/question-detail.component");
var home_component_1 = require("./home/home.component");
var bid_component_1 = require("./bid/bid.component");
var blab_component_1 = require("./blab/blab.component");
var about_component_1 = require("./about/about.component");
var routes = [
    {
        path: '',
        component: questions_component_1.QuestionsComponent,
        children: [
            { path: 'home', component: home_component_1.HomeComponent },
            { path: 'bid', component: bid_component_1.BidComponent },
            { path: 'blab', component: blab_component_1.BlabComponent },
            { path: 'about', component: about_component_1.AboutComponent },
            { path: 'question-detail/:questionId', component: question_detail_component_1.QuestionDetailComponent },
            { path: '**', redirectTo: 'home' }
        ]
    }
];
var QuestionsRoutingModule = /** @class */ (function () {
    function QuestionsRoutingModule() {
    }
    QuestionsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], QuestionsRoutingModule);
    return QuestionsRoutingModule;
}());
exports.QuestionsRoutingModule = QuestionsRoutingModule;
//# sourceMappingURL=questions-routing.module.js.map