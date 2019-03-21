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
var environment_1 = require("../../../../environments/environment");
var ImageblockComponent = /** @class */ (function () {
    function ImageblockComponent() {
        this.serverUrl = environment_1.environment.apiUrl;
    }
    ImageblockComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageblockComponent.prototype, "question", void 0);
    ImageblockComponent = __decorate([
        core_1.Component({
            selector: 'app-imageblock',
            templateUrl: './imageblock.component.html',
            styleUrls: ['./imageblock.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ImageblockComponent);
    return ImageblockComponent;
}());
exports.ImageblockComponent = ImageblockComponent;
//# sourceMappingURL=imageblock.component.js.map