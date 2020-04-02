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
var PractitionerApptComponent = /** @class */ (function () {
    function PractitionerApptComponent(referralService, route, patientsService, specialtyService, practitionersService, userService) {
        this.referralService = referralService;
        this.route = route;
        this.patientsService = patientsService;
        this.specialtyService = specialtyService;
        this.practitionersService = practitionersService;
        this.userService = userService;
    }
    PractitionerApptComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedPractitioners = [];
        this.referral = {};
        this.filteredPractitioners = [];
        this.practitioners = [];
        this.patient$ = this.route.paramMap.pipe(operators_1.switchMap(function (params) {
            return _this.patientsService.getPatient(params.get('id'));
        }));
        this.userService.getMe().subscribe(function (x) { return _this.user = x; });
    };
    PractitionerApptComponent.prototype.createReferral = function (patientId) {
        this.referral.PractitionerId = this.user.Practitioner.Id;
        this.referral.PatientId = patientId;
        this.referralService.createReferral(this.referral).subscribe(function (data) {
            window.location.href = '/app/physician/patients/' + patientId;
        });
    };
    PractitionerApptComponent.prototype.canCreateReferral = function () {
        if (!this.referral.Symptom) {
            return false;
        }
        return true;
    };
    PractitionerApptComponent = __decorate([
        core_1.Component({
            selector: 'app-practitioner-appt',
            templateUrl: './practitioner-appt.component.html',
            styleUrls: ['./practitioner-appt.component.scss']
        })
    ], PractitionerApptComponent);
    return PractitionerApptComponent;
}());
exports.PractitionerApptComponent = PractitionerApptComponent;
//# sourceMappingURL=practitioner-appt.component.js.map