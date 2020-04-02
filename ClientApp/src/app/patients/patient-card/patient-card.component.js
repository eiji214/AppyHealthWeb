"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PatientCardComponent = /** @class */ (function () {
    function PatientCardComponent(patientService) {
        this.patientService = patientService;
    }
    PatientCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.patientService.getPatient(this.patientId).subscribe(function (x) { return _this.patient = x; });
    };
    __decorate([
        core_1.Input()
    ], PatientCardComponent.prototype, "patientId", void 0);
    __decorate([
        core_1.Input()
    ], PatientCardComponent.prototype, "compact", void 0);
    PatientCardComponent = __decorate([
        core_1.Component({
            selector: 'app-patient-card',
            templateUrl: './patient-card.component.html',
            styleUrls: ['./patient-card.component.scss',
                '../../styles.scss']
        })
    ], PatientCardComponent);
    return PatientCardComponent;
}());
exports.PatientCardComponent = PatientCardComponent;
//# sourceMappingURL=patient-card.component.js.map