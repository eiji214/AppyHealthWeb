"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var practitioner_card_component_1 = require("./../practitioners/practitioner-card/practitioner-card.component");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var multiselect_component_1 = require("./multiselect/multiselect.component");
var age_pipe_1 = require("./pipes/age.pipe");
var equal_pipe_1 = require("./pipes/equal.pipe");
var filter_pipe_1 = require("./pipes/filter.pipe");
var phone_pipe_1 = require("./pipes/phone.pipe");
var searchbar_component_1 = require("./searchbar/searchbar.component");
var card_component_1 = require("./card/card.component");
var header_component_1 = require("./header/header.component");
var ngx_material_timepicker_1 = require("ngx-material-timepicker");
var patient_card_component_1 = require("../patients/patient-card/patient-card.component");
var referrals_edit_component_1 = require("./referrals-edit/referrals-edit.component");
var referrals_list_component_1 = require("./referrals-list/referrals-list.component");
var confirm_dialog_component_1 = require("./confirm-dialog/confirm-dialog.component");
var patient_next_appt_component_1 = require("./patient-next-appt/patient-next-appt.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MatDialogModule,
                material_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                material_1.MatSelectModule,
                router_1.RouterModule,
                ngx_material_timepicker_1.NgxMaterialTimepickerModule.forRoot()
            ],
            declarations: [
                filter_pipe_1.FilterPipe,
                equal_pipe_1.EqualPipe,
                age_pipe_1.AgePipe,
                phone_pipe_1.PhonePipe,
                multiselect_component_1.MultiselectComponent,
                card_component_1.CardComponent,
                searchbar_component_1.SearchbarComponent,
                header_component_1.HeaderComponent,
                referrals_edit_component_1.ReferralsEditComponent,
                referrals_list_component_1.ReferralsListComponent,
                patient_card_component_1.PatientCardComponent,
                practitioner_card_component_1.PractitionerCardComponent,
                confirm_dialog_component_1.ConfirmDialog,
                patient_next_appt_component_1.PatientNextApptComponent
            ],
            exports: [
                filter_pipe_1.FilterPipe,
                equal_pipe_1.EqualPipe,
                age_pipe_1.AgePipe,
                phone_pipe_1.PhonePipe,
                multiselect_component_1.MultiselectComponent,
                card_component_1.CardComponent,
                searchbar_component_1.SearchbarComponent,
                header_component_1.HeaderComponent,
                referrals_edit_component_1.ReferralsEditComponent,
                referrals_list_component_1.ReferralsListComponent,
                confirm_dialog_component_1.ConfirmDialog,
                patient_card_component_1.PatientCardComponent,
                practitioner_card_component_1.PractitionerCardComponent,
                patient_next_appt_component_1.PatientNextApptComponent
            ],
            entryComponents: [
                referrals_edit_component_1.ReferralsEditComponent,
                confirm_dialog_component_1.ConfirmDialog,
                patient_next_appt_component_1.PatientNextApptComponent
            ],
            providers: [
                equal_pipe_1.EqualPipe
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map