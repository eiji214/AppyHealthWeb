"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var referrals_routing_module_1 = require("./referrals-routing.module");
var ngx_material_timepicker_1 = require("ngx-material-timepicker");
var referrals_specialist_component_1 = require("./referrals-specialist/referrals-specialist.component");
var referrals_component_1 = require("./referrals/referrals.component");
var refer_patient_component_1 = require("./refer-patient/refer-patient.component");
var core_module_1 = require("../core/core.module");
var shared_module_1 = require("../shared/shared.module");
var patients_module_1 = require("../patients/patients.module");
var practitioners_module_1 = require("../practitioners/practitioners.module");
var practitioner_appt_component_1 = require("./practitioner-appt/practitioner-appt.component");
var select_1 = require("@angular/material/select");
var ReferralsModule = /** @class */ (function () {
    function ReferralsModule() {
    }
    ReferralsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                referrals_routing_module_1.ReferralRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                material_1.MatFormFieldModule,
                patients_module_1.PatientsModule,
                practitioners_module_1.PractitionersModule,
                material_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                material_1.MatDialogModule,
                ngx_material_timepicker_1.NgxMaterialTimepickerModule.forRoot(),
                select_1.MatSelectModule,
            ],
            declarations: [
                referrals_specialist_component_1.ReferralsSpecialistComponent,
                referrals_component_1.ReferralsComponent,
                refer_patient_component_1.ReferPatientComponent,
                practitioner_appt_component_1.PractitionerApptComponent
            ],
        })
    ], ReferralsModule);
    return ReferralsModule;
}());
exports.ReferralsModule = ReferralsModule;
//# sourceMappingURL=referrals.module.js.map