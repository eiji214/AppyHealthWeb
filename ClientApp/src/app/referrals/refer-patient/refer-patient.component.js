"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var ReferPatientComponent = /** @class */ (function () {
    function ReferPatientComponent(referralService, route, patientsService, specialtyService, practitionersService) {
        this.referralService = referralService;
        this.route = route;
        this.patientsService = patientsService;
        this.specialtyService = specialtyService;
        this.practitionersService = practitionersService;
    }
    ReferPatientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedPractitioners = [];
        this.referral = {};
        this.filteredPractitioners = [];
        this.patient$ = this.route.paramMap.pipe(operators_1.switchMap(function (params) {
            return _this.patientsService.getPatient(params.get('id'));
        }));
    };
    ReferPatientComponent.prototype.createReferral = function (patientId) {
        var j = this.selectedPractitioners.length;
        for (var i = 0; i < this.selectedPractitioners.length; i++) {
            this.referral.PractitionerId = this.selectedPractitioners[i].Id;
            this.referral.PatientId = patientId;
            this.referralService.createReferral(this.referral).subscribe(function (data) {
                j--;
                if (j === 0) {
                    window.location.href = '/app/physician/patients/' + patientId;
                }
            });
        }
    };
    ReferPatientComponent.prototype.setPractitioners = function (practitioners) {
        this.filteredPractitioners = practitioners;
    };
    ReferPatientComponent.prototype.canCreateReferral = function () {
        if (!this.selectedPractitioners || this.selectedPractitioners.length === 0) {
            return false;
        }
        if (!this.referral.Symptom) {
            return false;
        }
        return true;
    };
    ReferPatientComponent.prototype.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };
    ReferPatientComponent.prototype.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    ReferPatientComponent.prototype.isChecked = function (selectedList, list) {
        if (!list || !selectedList) {
            return false;
        }
        return selectedList.length === list.length;
    };
    ReferPatientComponent.prototype.toggleAllPractitioners = function () {
        if (this.selectedPractitioners.length === this.filteredPractitioners.length) {
            this.selectedPractitioners = [];
        }
        else if (this.selectedPractitioners.length === 0 || this.selectedPractitioners.length > 0) {
            this.selectedPractitioners = this.filteredPractitioners.slice(0);
        }
    };
    ReferPatientComponent = __decorate([
        core_1.Component({
            selector: 'app-refer-patient',
            templateUrl: './refer-patient.component.html',
            styleUrls: ['./refer-patient.component.scss',
                '../../styles.scss']
        })
    ], ReferPatientComponent);
    return ReferPatientComponent;
}());
exports.ReferPatientComponent = ReferPatientComponent;
//# sourceMappingURL=refer-patient.component.js.map