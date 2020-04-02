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
var PatientReferralComponent = /** @class */ (function () {
    function PatientReferralComponent(practitionerService, patientsService, referralsService, route) {
        this.practitionerService = practitionerService;
        this.patientsService = patientsService;
        this.referralsService = referralsService;
        this.route = route;
    }
    PatientReferralComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.practitioners$ = this.practitionerService.getPractitioners();
        this.patient$ = this.route.paramMap.pipe(operators_1.switchMap(function (params) {
            return _this.patientsService.getPatient(params.get('id'));
        }));
    };
    PatientReferralComponent.prototype.createReferral = function (specialistId, patientId) {
        // this.referralsService.createReferral(specialistId, patientId).subscribe((referral) => {
        //  console.log(referral);
        // });
    };
    PatientReferralComponent = __decorate([
        core_1.Component({
            selector: 'app-patient-referral',
            templateUrl: './patient-referral.component.html',
            styleUrls: ['./patient-referral.component.scss',
                '../../styles.scss']
        })
    ], PatientReferralComponent);
    return PatientReferralComponent;
}());
exports.PatientReferralComponent = PatientReferralComponent;
//# sourceMappingURL=patient-referral.component.js.map