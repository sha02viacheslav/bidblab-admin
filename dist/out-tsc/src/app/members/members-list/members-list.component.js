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
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_service_1 = require("../../shared/services/common.service");
var material_2 = require("@angular/material");
var dialog_service_1 = require("../../shared/services/dialog.service");
var authentication_service_1 = require("../../shared/services/authentication.service");
var block_ui_service_1 = require("../../shared/services/block-ui.service");
var forms_1 = require("@angular/forms");
var sockets_service_1 = require("../../shared/services/sockets.service");
var animations_1 = require("@angular/animations");
var MembersListComponent = /** @class */ (function () {
    function MembersListComponent(fb, socketsService, blockUIService, commonService, snackBar, authenticationService, dialogService, router) {
        this.fb = fb;
        this.socketsService = socketsService;
        this.blockUIService = blockUIService;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
        this.dialogService = dialogService;
        this.router = router;
        // public displayedColumns = ['firstname', 'lastname', 'username', 'email', 'profilePicture', 'aboutme',
        //                            'gender', 'birthday', 'phone', 'physicaladdress', 'shippingaddress',
        //                            'tags', 'follows',
        //                            'verified', 'verificationTokenExpiry', "resetPasswordTokenExpiry",
        //                            "createdAt",  "updatedAt",
        //                            'details', 'update', 'delete'];
        this.displayedColumns = ['username', 'birthday', 'physicaladdress', 'details', 'update', 'delete'];
        this.dataSource = new material_1.MatTableDataSource();
        this.redirectToDetails = function (id) {
            event.preventDefault();
            console.log(id);
        };
        this.redirectToUpdate = function (id) {
            console.log(id);
        };
        this.redirectToDelete = function (id) {
            console.log(id);
        };
    }
    MembersListComponent.prototype.ngOnInit = function () {
        //this.newQuestionFlag = false;
        this.pageSize = 10;
        //this.autocomplete = [];
        // this.form = this.fb.group({
        //   search: ''
        // });
        this.getAllMembers();
    };
    MembersListComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
    };
    MembersListComponent.prototype.getAllMembers = function (event) {
        var _this = this;
        this.blockUIService.setBlockStatus(true);
        if (event) {
            this.pageSize = event.pageSize;
        }
        //this.autocomplete.splice(0);
        var observable = event
            ? this.commonService.getMembers(event.pageSize, event.pageIndex, ""
            //this.form.value.search
            )
            : this.commonService.getMembers(null, null, ""); //this.form.value.search);
        observable.subscribe(function (res) {
            _this.totalMembers = res.data.totalMembers;
            _this.dataSource.data = res.data.members;
            _this.blockUIService.setBlockStatus(false);
        }, function (err) {
            _this.snackBar.open(err.error.msg, 'Dismiss');
        });
    };
    __decorate([
        core_1.ViewChild(MatSort),
        __metadata("design:type", Object)
    ], MembersListComponent.prototype, "sort", void 0);
    MembersListComponent = __decorate([
        core_1.Component({
            selector: 'app-members-list',
            templateUrl: './members-list.component.html',
            styleUrls: ['./members-list.component.scss'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0', display: 'none' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ],
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            sockets_service_1.SocketsService,
            block_ui_service_1.BlockUIService,
            common_service_1.CommonService,
            material_2.MatSnackBar,
            authentication_service_1.AuthenticationService,
            dialog_service_1.DialogService,
            router_1.Router])
    ], MembersListComponent);
    return MembersListComponent;
}());
exports.MembersListComponent = MembersListComponent;
//# sourceMappingURL=members-list.component.js.map