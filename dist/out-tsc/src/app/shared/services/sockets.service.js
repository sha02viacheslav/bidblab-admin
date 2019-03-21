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
var environment_1 = require("../../../environments/environment");
var io = require("socket.io-client");
var rxjs_1 = require("rxjs");
var SocketsService = /** @class */ (function () {
    function SocketsService() {
        this.socket = io.connect(environment_1.environment.apiUrl);
        this.listenToSocket();
    }
    SocketsService.prototype.getSocketEvents = function () {
        return this.socketEvents;
    };
    SocketsService.prototype.notify = function (event, data) {
        this.socket.emit(event, data);
    };
    SocketsService.prototype.listenToSocket = function () {
        var _this = this;
        this.socketEvents = rxjs_1.Observable.create(function (observer) {
            _this.socket.on('createdData', function (payload) {
                observer.next({ name: 'createdData', payload: payload });
            });
            _this.socket.on('updatedData', function (payload) {
                observer.next({ name: 'updatedData', payload: payload });
            });
            _this.socket.on('deletedData', function (payload) {
                observer.next({ name: 'deletedData', payload: payload });
            });
        });
    };
    SocketsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SocketsService);
    return SocketsService;
}());
exports.SocketsService = SocketsService;
//# sourceMappingURL=sockets.service.js.map