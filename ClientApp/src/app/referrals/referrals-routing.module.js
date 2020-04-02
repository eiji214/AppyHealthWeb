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
var referrals_component_1 = require("./referrals/referrals.component");
var refer_patient_component_1 = require("./refer-patient/refer-patient.component");
var practitioner_appt_component_1 = require("./practitioner-appt/practitioner-appt.component");
var referralsRoutes = [
    { path: '', component: referrals_component_1.ReferralsComponent },
    { path: ':id', component: refer_patient_component_1.ReferPatientComponent },
    { path: ':id/:practitionerId', component: practitioner_appt_component_1.PractitionerApptComponent }
];
var ReferralRoutingModule = /** @class */ (function () {
    function ReferralRoutingModule() {
    }
    ReferralRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(referralsRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], ReferralRoutingModule);
    return ReferralRoutingModule;
}());
exports.ReferralRoutingModule = ReferralRoutingModule;
//# sourceMappingURL=referrals-routing.module.js.map