import { MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferralRoutingModule } from './referrals-routing.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { ReferralsSpecialistComponent } from './referrals-specialist/referrals-specialist.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { ReferPatientComponent } from './refer-patient/refer-patient.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PatientsModule } from '../patients/patients.module';
import { PractitionersModule } from '../practitioners/practitioners.module';
import { PractitionerApptComponent } from './practitioner-appt/practitioner-appt.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    ReferralRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    MatFormFieldModule,
    PatientsModule,
    PractitionersModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatSelectModule,
  ],
  declarations: [
    ReferralsSpecialistComponent,
    ReferralsComponent,
    ReferPatientComponent,
    PractitionerApptComponent
  ],
})
export class ReferralsModule { }
