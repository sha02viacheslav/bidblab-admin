"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormValidationService = /** @class */ (function () {
    function FormValidationService() {
    }
    FormValidationService.prototype.isBlank = function (control) {
        return control && control.value && control.value.trim()
            ? null
            : { blank: true };
    };
    FormValidationService.prototype.isAdault = function (control) {
        if (control && control.value) {
            var ageDifMs = Date.now() - control.value.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);
            if (age >= 18) {
                return null;
            }
        }
        return { notAdault: true };
    };
    FormValidationService.prototype.arePasswordsMismatching = function (control) {
        return control.value &&
            control.parent &&
            control.value === control.parent.get('password').value
            ? null
            : {
                passwordsMismatch: true
            };
    };
    FormValidationService.prototype.checkError = function (form, field, error) {
        if (Array.isArray(error)) {
            return error.some(function (err) {
                return form.get(field).hasError(err) &&
                    (form.get(field).dirty || form.get(field).touched);
            });
        }
        else {
            return (form.get(field).hasError(error) &&
                (form.get(field).dirty || form.get(field).touched));
        }
    };
    FormValidationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FormValidationService);
    return FormValidationService;
}());
exports.FormValidationService = FormValidationService;
//# sourceMappingURL=form-validation.service.js.map