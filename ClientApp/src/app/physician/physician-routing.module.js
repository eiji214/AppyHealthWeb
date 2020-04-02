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
var loginGuard_1 = require("../auth/loginGuard");
var physician_layout_component_1 = require("./layout/physician-layout.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var mid_level_profile_component_1 = require("./profile/mid-level/mid-level-profile.component");
var physician_profile_component_1 = require("./profile/physician/physician-profile.component");
var practice_profile_component_1 = require("./profile/practice/practice-profile.component");
var editProfile_component_1 = require("./profile/editProfile.component");
var setup_component_1 = require("./setup/setup.component");
var physician_profiles_component_1 = require("./profile/physician/physician-profiles/physician-profiles.component");
var practice_profiles_component_1 = require("./profile/practice/practice-profiles/practice-profiles.component");
var mid_level_profiles_component_1 = require("./profile/mid-level/mid-level-profiles/mid-level-profiles.component");
var routes = [
    {
        path: 'physician',
        component: physician_layout_component_1.PhysicianLayoutComponent,
        children: [
            { path: '', component: dashboard_component_1.DashboardComponent, canActivate: [loginGuard_1.LoginGuard] },
            { path: 'profile', component: physician_profile_component_1.PhysicianProfileComponent },
            { path: 'profile/physicianprofiles', component: physician_profiles_component_1.PhysicianProfilesComponent },
            { path: 'profile/midlevelprofiles', component: mid_level_profiles_component_1.MidLevelProfilesComponent },
            //{ path: 'profile/staffprofiles', component: StaffProfilesComponent },
            { path: 'profile/physicianprofile', component: physician_profile_component_1.PhysicianProfileComponent },
            { path: 'profile/midlevelprofile', component: mid_level_profile_component_1.MidLevelProfileComponent },
            //{ path: 'profile/staffprofile', component: StaffProfileComponent },
            { path: 'profile/edit', component: editProfile_component_1.EditProfileComponent },
            { path: 'profile/setup', component: setup_component_1.SetupComponent },
            { path: 'patients', loadChildren: '../patients/patients.module#PatientsModule' },
            { path: 'practitioners', loadChildren: '../practitioners/practitioners.module#PractitionersModule' },
            { path: 'referrals', loadChildren: '../referrals/referrals.module#ReferralsModule' },
            { path: 'appointments', loadChildren: './appointments/appointments.module#AppointmentsModule' },
        ]
    },
    {
        path: 'practice',
        component: physician_layout_component_1.PhysicianLayoutComponent,
        children: [
            { path: '', component: dashboard_component_1.DashboardComponent },
            { path: 'profile', component: practice_profile_component_1.PracticeProfileComponent },
            { path: 'profile/edit', component: practice_profile_component_1.PracticeProfileComponent },
            { path: 'profiles', component: practice_profiles_component_1.PracticeProfilesComponent },
            { path: 'profile/setup', component: setup_component_1.SetupComponent }
        ]
    }
];
var PhysicianRoutingModule = /** @class */ (function () {
    function PhysicianRoutingModule() {
    }
    PhysicianRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PhysicianRoutingModule);
    return PhysicianRoutingModule;
}());
exports.PhysicianRoutingModule = PhysicianRoutingModule;
//# sourceMappingURL=physician-routing.module.js.map