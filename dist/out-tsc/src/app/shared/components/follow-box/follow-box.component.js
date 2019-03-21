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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var common_service_1 = require("../../services/common.service");
var sockets_service_1 = require("../../services/sockets.service");
var block_ui_service_1 = require("../../services/block-ui.service");
var authentication_service_1 = require("../../services/authentication.service");
var dialog_service_1 = require("../../../shared/services/dialog.service");
var FollowBoxComponent = /** @class */ (function () {
    function FollowBoxComponent(fb, commonService, socketsService, blockUIService, snackBar, authenticationService, dialogService) {
        this.fb = fb;
        this.commonService = commonService;
        this.socketsService = socketsService;
        this.blockUIService = blockUIService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
    }
    FollowBoxComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FollowBoxComponent.prototype, "question", void 0);
    FollowBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-follow-box',
            templateUrl: './follow-box.component.html',
            styleUrls: ['./follow-box.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            common_service_1.CommonService,
            sockets_service_1.SocketsService,
            block_ui_service_1.BlockUIService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService])
    ], FollowBoxComponent);
    return FollowBoxComponent;
}());
exports.FollowBoxComponent = FollowBoxComponent;
//# sourceMappingURL=follow-box.component.js.map