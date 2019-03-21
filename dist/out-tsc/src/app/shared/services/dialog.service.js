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
var flex_layout_1 = require("@angular/flex-layout");
var DialogService = /** @class */ (function () {
    function DialogService(dialog, media) {
        this.dialog = dialog;
        this.media = media;
        this.getMediaUpdates();
    }
    DialogService.prototype.ngOnDestroy = function () {
        this.mediaUpdatesSubscription.unsubscribe();
    };
    DialogService.prototype.getMediaUpdates = function () {
        var _this = this;
        this.mediaUpdatesSubscription = this.media.subscribe(function (change) {
            var dialogRef = _this.dialog.getDialogById(_this.dialogRefId);
            if (dialogRef) {
                if (change.mqAlias === 'xs') {
                    dialogRef.updateSize('100%', '100%');
                }
                else {
                    dialogRef.updateSize('400px');
                }
            }
        });
    };
    DialogService.prototype.open = function (component, options) {
        this.closeAll();
        var defaultOptions = this.media.isActive('gt-xs')
            ? {
                width: '400px'
            }
            : {
                maxWidth: '100vw',
                maxHeight: '100vh',
                height: '100%',
                width: '100%'
            };
        var dialogRef = this.dialog.open(component, Object.assign(defaultOptions, options || {}));
        this.dialogRefId = dialogRef.id;
        return dialogRef;
    };
    DialogService.prototype.closeAll = function () {
        this.dialog.closeAll();
    };
    DialogService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [material_1.MatDialog, flex_layout_1.ObservableMedia])
    ], DialogService);
    return DialogService;
}());
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map