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
var common_service_1 = require("../../../shared/services/common.service");
var dialog_service_1 = require("../../../shared/services/dialog.service");
var authentication_service_1 = require("../../../shared/services/authentication.service");
var block_ui_service_1 = require("../../../shared/services/block-ui.service");
var sockets_service_1 = require("../../../shared/services/sockets.service");
var form_validation_service_1 = require("../../services/form-validation.service");
var SearchBoxComponent = /** @class */ (function () {
    function SearchBoxComponent(fb, formValidationService, socketsService, blockUIService, commonService, snackBar, authenticationService, dialogService) {
        this.fb = fb;
        this.formValidationService = formValidationService;
        this.socketsService = socketsService;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
    }
    SearchBoxComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchBoxComponent.prototype, "question", void 0);
    SearchBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-search-box',
            templateUrl: './search-box.component.html',
            styleUrls: ['./search-box.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            form_validation_service_1.FormValidationService,
            sockets_service_1.SocketsService,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_1.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService])
    ], SearchBoxComponent);
    return SearchBoxComponent;
}());
exports.SearchBoxComponent = SearchBoxComponent;
//# sourceMappingURL=search-box.component.js.map