"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var physician_routing_module_1 = require("./physician-routing.module");
var physician_service_1 = require("./physician.service");
var user_service_1 = require("../common/user.service");
var physician_layout_component_1 = require("./layout/physician-layout.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var mid_level_profile_component_1 = require("./profile/mid-level/mid-level-profile.component");
var physician_profile_component_1 = require("./profile/physician/physician-profile.component");
// import { StaffProfileComponent } from "./profile/staff/staff-profile.component";
var practice_profile_component_1 = require("./profile/practice/practice-profile.component");
var editProfile_component_1 = require("./profile/editProfile.component");
var setup_component_1 = require("./setup/setup.component");
var header_component_1 = require("./setup/header.component");
var practice_setup_component_1 = require("./setup/practice/practice-setup.component");
var physician_setup_component_1 = require("./setup/physician/physician-setup.component");
var midlevel_setup_component_1 = require("./setup/midLevel/midlevel-setup.component");
var staff_setup_component_1 = require("./setup/staff/staff-setup.component");
var confirm_component_1 = require("./setup/confirm.component");
var activate_component_1 = require("./setup/activate.component");
var checkout_component_1 = require("./setup/checkout.component");
var practice_dialog_component_1 = require("./setup/practice/practice-dialog.component");
var physician_dialog_component_1 = require("./setup/physician/physician-dialog.component");
var midlevel_dialog_component_1 = require("./setup/midLevel/midlevel-dialog.component");
var staff_dialog_component_1 = require("./setup/staff/staff-dialog.component");
var phone_pipe_1 = require("../common/pipes/phone.pipe");
var material_module_1 = require("../material/material-module");
var core_2 = require("@agm/core");
var physician_profiles_component_1 = require("./profile/physician/physician-profiles/physician-profiles.component");
var practice_overview_edit_component_1 = require("./profile/practice/practice-overview-edit/practice-overview-edit.component");
var practice_profiles_component_1 = require("./profile/practice/practice-profiles/practice-profiles.component");
var practice_admin_staff_edit_component_1 = require("./profile/practice/practice-admin-staff-edit/practice-admin-staff-edit.component");
var mid_level_profiles_component_1 = require("./profile/mid-level/mid-level-profiles/mid-level-profiles.component");
// import { StaffProfilesComponent } from './profile/staff/staff-profiles/staff-profiles.component';
var auth_service_1 = require("../auth/auth.service");
var loginGuard_1 = require("../auth/loginGuard");
var PhysicianModule = /** @class */ (function () {
    function PhysicianModule() {
    }
    PhysicianModule = __decorate([
        core_1.NgModule({
            imports: [
                physician_routing_module_1.PhysicianRoutingModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModalModule,
                ng_bootstrap_1.NgbCollapseModule,
                material_module_1.MaterialModule,
                core_2.AgmCoreModule
            ],
            providers: [
                physician_service_1.PhysicianService,
                user_service_1.UserService,
                auth_service_1.AuthService,
                loginGuard_1.LoginGuard
            ],
            declarations: [
                physician_layout_component_1.PhysicianLayoutComponent,
                dashboard_component_1.DashboardComponent,
                mid_level_profile_component_1.MidLevelProfileComponent,
                practice_setup_component_1.PracticeSetupComponent,
                // StaffProfileComponent,
                physician_profile_component_1.PhysicianProfileComponent,
                practice_profile_component_1.PracticeProfileComponent,
                editProfile_component_1.EditProfileComponent,
                setup_component_1.SetupComponent,
                header_component_1.HeaderComponent,
                physician_setup_component_1.PhysicianSetupComponent,
                midlevel_setup_component_1.MidLevelSetupComponent,
                staff_setup_component_1.StaffSetupComponent,
                confirm_component_1.ConfirmSetupComponent,
                activate_component_1.ActivateSetupComponent,
                checkout_component_1.CheckoutSetupComponent,
                practice_dialog_component_1.PracticeDialogComponent,
                physician_dialog_component_1.PhysicianDialogComponent,
                midlevel_dialog_component_1.MidLevelDialogComponent,
                staff_dialog_component_1.StaffDialogComponent,
                phone_pipe_1.PhonePipe,
                physician_profiles_component_1.PhysicianProfilesComponent,
                practice_overview_edit_component_1.PracticeOverviewEditComponent,
                practice_admin_staff_edit_component_1.PracticeAdminStaffEditComponent,
                practice_profiles_component_1.PracticeProfilesComponent,
                mid_level_profiles_component_1.MidLevelProfilesComponent,
            ],
            entryComponents: [
                practice_overview_edit_component_1.PracticeOverviewEditComponent,
                practice_admin_staff_edit_component_1.PracticeAdminStaffEditComponent,
                practice_dialog_component_1.PracticeDialogComponent,
                physician_dialog_component_1.PhysicianDialogComponent,
                midlevel_dialog_component_1.MidLevelDialogComponent,
                staff_dialog_component_1.StaffDialogComponent,
            ],
            bootstrap: [physician_layout_component_1.PhysicianLayoutComponent]
        })
    ], PhysicianModule);
    return PhysicianModule;
}());
exports.PhysicianModule = PhysicianModule;
//# sourceMappingURL=physician.module.js.map