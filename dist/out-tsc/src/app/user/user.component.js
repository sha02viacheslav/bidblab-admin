"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var form_validation_service_1 = require("../shared/services/form-validation.service");
var block_ui_service_1 = require("../shared/services/block-ui.service");
var authentication_service_1 = require("../shared/services/authentication.service");
var user_service_1 = require("../shared/services/user.service");
var dialog_service_1 = require("../shared/services/dialog.service");
var common_service_1 = require("../shared/services/common.service");
var router_1 = require("@angular/router");
var sockets_service_1 = require("../shared/services/sockets.service");
var login_component_1 = require("../shared/components/login/login.component");
var environment_1 = require("../../environments/environment");
var flex_layout_1 = require("@angular/flex-layout");
var material_2 = require("@angular/material");
var UserComponent = /** @class */ (function () {
    function UserComponent(route, router, socketsService, commonService, dialogService, fb, formValidationService, authenticationService, blockUIService, userService, snackBar, media) {
        this.route = route;
        this.router = router;
        this.socketsService = socketsService;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.fb = fb;
        this.formValidationService = formValidationService;
        this.authenticationService = authenticationService;
        this.blockUIService = blockUIService;
        this.userService = userService;
        this.snackBar = snackBar;
        this.media = media;
        this.serverUrl = environment_1.environment.apiUrl;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.isInit = false;
        this.isAuthenticated();
    };
    UserComponent.prototype.ngOnDestroy = function () {
        if (this.isInit) {
        }
    };
    UserComponent.prototype.initialize = function () {
        this.getUserData();
        this.followed = true;
        this.selected_tag = ["alltags"];
        this.tagsOfAnswerForm = this.fb.group({
            tagsOfAnswer: new forms_1.FormControl('')
        });
        this.tagsOfQuestionForm = this.fb.group({
            tagsOfQuestion: new forms_1.FormControl('')
        });
    };
    UserComponent.prototype.isMediaActive = function (breakpoint) {
        return this.media.isActive(breakpoint);
    };
    UserComponent.prototype.isAuthenticated = function () {
        var _this = this;
        if (this.authenticationService.isAdmin()) {
            this.initialize();
        }
        else {
            setTimeout(function () { return _this.dialogService.open(login_component_1.LoginComponent)
                .afterClosed()
                .subscribe(function (result) {
                if (result == 'OK') {
                    _this.initialize();
                }
                else {
                    _this.commonService.goHome();
                }
            }); });
        }
    };
    UserComponent.prototype.isAdmin = function () {
        return this.authenticationService.isAdmin();
    };
    UserComponent.prototype.getUserData = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            if (params.has('userId')) {
                var userId = params.get('userId');
                _this.getUserDataByuserId(userId);
                _this.getUserAnswerByuserId(userId, null);
                _this.getUserQuestionByuserId(userId, null);
            }
        });
    };
    UserComponent.prototype.getUserDataByuserId = function (userId) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        this.commonService.getUserDataByuserId(userId).subscribe(function (res) {
            _this.user = res.data.user;
            _this.followed = !_this.canFollow();
            _this.blockUIService.setBlockStatus(false);
        }, function (err) {
            _this.snackBar.open(err.error.msg, 'Dismiss');
            _this.blockUIService.setBlockStatus(false);
        });
    };
    UserComponent.prototype.getUserAnswerByuserId = function (userId, interestFilter) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        this.commonService.getUserAnswerByuserId(userId, interestFilter).subscribe(function (res) {
            _this.answers = res.data.answers;
            _this.total_answers = res.data.total_answers;
            _this.answerTags = res.data.answerTags;
            _this.snackBar
                .open(res.msg, 'Dismiss', {
                duration: 1500
            })
                .afterOpened()
                .subscribe(function () {
                _this.blockUIService.setBlockStatus(false);
            });
        }, function (err) {
            _this.snackBar.open(err.error.msg, 'Dismiss');
            _this.blockUIService.setBlockStatus(false);
        });
    };
    UserComponent.prototype.getUserQuestionByuserId = function (userId, interestFilter) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        this.commonService.getUserQuestionByuserId(userId, interestFilter).subscribe(function (res) {
            _this.total_questions = res.data.total_questions;
            _this.questions = res.data.questions;
            _this.questionTags = res.data.questionTags;
            _this.snackBar
                .open(res.msg, 'Dismiss', {
                duration: 1500
            })
                .afterOpened()
                .subscribe(function () {
                _this.blockUIService.setBlockStatus(false);
            });
        }, function (err) {
            _this.snackBar.open(err.error.msg, 'Dismiss');
            _this.blockUIService.setBlockStatus(false);
        });
    };
    UserComponent.prototype.changeAnswerTag = function () {
        this.getUserAnswerByuserId(this.user._id, this.tagsOfAnswerForm.value.tagsOfAnswer);
    };
    UserComponent.prototype.changeQuestionTag = function () {
        this.getUserQuestionByuserId(this.user._id, this.tagsOfQuestionForm.value.tagsOfQuestion);
    };
    UserComponent.prototype.tosslePerOneOfAnswer = function (all) {
        if (this.allAnswerTagsSelected.selected) {
            this.allAnswerTagsSelected.deselect();
            return false;
        }
        if (this.tagsOfAnswerForm.controls.tagsOfAnswer.value.length == this.answerTags.length) {
            this.allAnswerTagsSelected.select();
        }
    };
    UserComponent.prototype.toggleAllSelectionOfAnswer = function () {
        if (this.allAnswerTagsSelected.selected) {
            this.tagsOfAnswerForm.controls.tagsOfAnswer
                .patchValue(this.answerTags.map(function (item) { return item; }).concat([0]));
        }
        else {
            this.tagsOfAnswerForm.controls.tagsOfAnswer.patchValue([]);
        }
    };
    UserComponent.prototype.tosslePerOneOfQuestion = function () {
        if (this.allQuestionTagsSelected.selected) {
            this.allQuestionTagsSelected.deselect();
            return false;
        }
        if (this.tagsOfQuestionForm.controls.tagsOfQuestion.value.length == this.questionTags.length) {
            this.allQuestionTagsSelected.select();
        }
    };
    UserComponent.prototype.toggleAllSelectionOfQuestion = function () {
        if (this.allQuestionTagsSelected.selected) {
            this.tagsOfQuestionForm.controls.tagsOfQuestion
                .patchValue(this.questionTags.map(function (item) { return item; }).concat([0]));
        }
        else {
            this.tagsOfQuestionForm.controls.tagsOfQuestion.patchValue([]);
        }
    };
    UserComponent.prototype.canFollow = function () {
        var _this = this;
        return (!(this.authenticationService.getUser()._id === this.user._id) &&
            !this.user.follows.some(function (follow) {
                return follow.follower &&
                    follow.follower === _this.authenticationService.getUser()._id;
            }));
    };
    UserComponent.prototype.addFollow = function (followType) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        if (this.user._id && this.authenticationService.getUser()._id) {
            this.commonService
                .addFollow(followType, this.user._id)
                .subscribe(function (res) {
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(res.msg, 'Dismiss', {
                    duration: 1500
                })
                    .afterOpened()
                    .subscribe(function () {
                    _this.user = res.data;
                    _this.followed = true;
                });
            }, function (err) {
                _this.submitted = false;
                _this.blockUIService.setBlockStatus(false);
                _this.snackBar
                    .open(err.error.msg, 'Dismiss', {
                    duration: 4000
                })
                    .afterDismissed()
                    .subscribe(function () { });
            });
        }
    };
    UserComponent.prototype.deleteUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.deleteUser(this.user._id)];
                    case 1:
                        res = (_a.sent());
                        this.socketsService.notify('deletedData', {
                            type: 'user',
                            data: res.data
                        });
                        this.snackBar.open(res.msg, 'Dismiss', {
                            duration: 1500
                        });
                        this.router.navigateByUrl('/');
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.snackBar.open(err_1.error.msg, 'Dismiss');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('allAnswerTagsSelected'),
        __metadata("design:type", material_2.MatOption)
    ], UserComponent.prototype, "allAnswerTagsSelected", void 0);
    __decorate([
        core_1.ViewChild('allQuestionTagsSelected'),
        __metadata("design:type", material_2.MatOption)
    ], UserComponent.prototype, "allQuestionTagsSelected", void 0);
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            sockets_service_1.SocketsService,
            common_service_1.CommonService,
            dialog_service_1.DialogService,
            forms_1.FormBuilder,
            form_validation_service_1.FormValidationService,
            authentication_service_1.AuthenticationService,
            block_ui_service_1.BlockUIService,
            user_service_1.UserService,
            material_1.MatSnackBar,
            flex_layout_1.ObservableMedia])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map