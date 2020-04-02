"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var material_1 = require("@angular/material");
var core_module_1 = require("../core/core.module");
var shared_module_1 = require("../shared/shared.module");
var ngx_mask_1 = require("ngx-mask");
var ng_select_1 = require("@ng-select/ng-select");
var angular2_text_mask_1 = require("angular2-text-mask");
var patients_routing_module_1 = require("./patients-routing.module");
var confirm_delete_dialog_component_1 = require("./patient-detail-left-panel/confirm-delete-dialog.component");
var patients_search_component_1 = require("./patients-search/patients-search.component");
var patients_layout_component_1 = require("./layout/patients-layout.component");
var patient_detail_component_1 = require("./patient-detail/patient-detail.component");
var patient_detail_left_panel_component_1 = require("./patient-detail-left-panel/patient-detail-left-panel.component");
var patients_component_1 = require("./patients/patients.component");
var patient_referral_component_1 = require("./patient-referral/patient-referral.component");
var patient_new_component_1 = require("./patient-new/patient-new.component");
var automated_message_component_1 = require("./automated-message/automated-message.component");
var patient_eligibility_component_1 = require("./patient-eligibility/patient-eligibility.component");
var fax_message_component_1 = require("./fax-message/fax-message.component");
var patient_verification_component_1 = require("./patient-verification/patient-verification.component");
var PatientsModule = /** @class */ (function () {
    function PatientsModule() {
    }
    PatientsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                patients_routing_module_1.PatientsRoutingModule,
                dialog_1.MatDialogModule,
                material_1.MatTabsModule,
                material_1.MatFormFieldModule,
                material_1.MatSelectModule,
                material_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                material_1.MatInputModule,
                ngx_mask_1.NgxMaskModule,
                ng_select_1.NgSelectModule,
                angular2_text_mask_1.TextMaskModule
            ],
            declarations: [
                patients_component_1.PatientsComponent,
                patient_detail_component_1.PatientDetailComponent,
                patient_eligibility_component_1.PatientEligibilityComponent,
                patient_new_component_1.PatientNewComponent,
                patient_referral_component_1.PatientReferralComponent,
                patients_search_component_1.PatientsSearchComponent,
                patient_detail_left_panel_component_1.PatientDetailLeftPanelComponent, confirm_delete_dialog_component_1.ConfirmDeleteDialog,
                automated_message_component_1.AutomatedMessageComponent,
                fax_message_component_1.FaxMessageComponent,
                patient_verification_component_1.PatientVerificationComponent,
                patients_layout_component_1.PatientsLayoutComponent,
            ],
            exports: [
                confirm_delete_dialog_component_1.ConfirmDeleteDialog
            ],
            entryComponents: [
                confirm_delete_dialog_component_1.ConfirmDeleteDialog,
                patient_new_component_1.PatientNewComponent,
                automated_message_component_1.AutomatedMessageComponent,
                fax_message_component_1.FaxMessageComponent,
                patient_verification_component_1.PatientVerificationComponent
            ],
            providers: [],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], PatientsModule);
    return PatientsModule;
}());
exports.PatientsModule = PatientsModule;
//# sourceMappingURL=patients.module.js.map