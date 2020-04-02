"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var patients_layout_component_1 = require("./layout/patients-layout.component");
var patients_component_1 = require("./patients/patients.component");
var patient_detail_component_1 = require("./patient-detail/patient-detail.component");
var patient_referral_component_1 = require("./patient-referral/patient-referral.component");
var patient_eligibility_component_1 = require("./patient-eligibility/patient-eligibility.component");
var routes = [
    {
        path: '',
        component: patients_layout_component_1.PatientsLayoutComponent,
        children: [
            { path: '', component: patients_component_1.PatientsComponent },
            { path: ':id', component: patient_detail_component_1.PatientDetailComponent },
            { path: 'referral/:id', component: patient_referral_component_1.PatientReferralComponent },
            { path: 'eligibility/:id', component: patient_eligibility_component_1.PatientEligibilityComponent }
        ]
    }
];
var PatientsRoutingModule = /** @class */ (function () {
    function PatientsRoutingModule() {
    }
    PatientsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], PatientsRoutingModule);
    return PatientsRoutingModule;
}());
exports.PatientsRoutingModule = PatientsRoutingModule;
//# sourceMappingURL=patients-routing.module.js.map