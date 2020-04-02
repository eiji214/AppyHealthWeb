import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule, MatFormFieldModule, MatSelectModule,
  MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';

import { PatientsRoutingModule } from './patients-routing.module';

import { ConfirmDeleteDialog } from './patient-detail-left-panel/confirm-delete-dialog.component';
import { PatientsSearchComponent } from './patients-search/patients-search.component';

import { PatientsLayoutComponent } from './layout/patients-layout.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientDetailLeftPanelComponent } from './patient-detail-left-panel/patient-detail-left-panel.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientReferralComponent } from './patient-referral/patient-referral.component';
import { PatientNewComponent } from './patient-new/patient-new.component';
import { AutomatedMessageComponent } from './automated-message/automated-message.component';
import { PatientEligibilityComponent } from './patient-eligibility/patient-eligibility.component';
import { FaxMessageComponent } from './fax-message/fax-message.component';
import { PatientVerificationComponent } from './patient-verification/patient-verification.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaskModule,
    NgSelectModule,
    TextMaskModule
  ],
  declarations: [
    PatientsComponent,
    PatientDetailComponent,
    PatientEligibilityComponent,
    PatientNewComponent,
    PatientReferralComponent,
    PatientsSearchComponent,
    PatientDetailLeftPanelComponent, ConfirmDeleteDialog,
    AutomatedMessageComponent,
    FaxMessageComponent,
    PatientVerificationComponent,
    PatientsLayoutComponent,
  ],
  exports: [
    ConfirmDeleteDialog
  ],
  entryComponents: [
    ConfirmDeleteDialog,
    PatientNewComponent,
    AutomatedMessageComponent,
    FaxMessageComponent,
    PatientVerificationComponent
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientsModule { }
