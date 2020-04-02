import { RouterModule } from '@angular/router';
import { PractitionerCardComponent } from './../practitioners/practitioner-card/practitioner-card.component';
import { MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiselectComponent } from './multiselect/multiselect.component';
import { AgePipe } from './pipes/age.pipe';
import { EqualPipe } from './pipes/equal.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PatientCardComponent } from '../patients/patient-card/patient-card.component';
import { ReferralsEditComponent } from './referrals-edit/referrals-edit.component';
import { ReferralsListComponent } from './referrals-list/referrals-list.component';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import { PatientNextApptComponent } from './patient-next-appt/patient-next-appt.component';
import { AppStoreCTABarComponent } from './AppStoreCTABar/AppStoreCTABar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    RouterModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  declarations: [
    FilterPipe,
    EqualPipe,
    AgePipe,
    PhonePipe,
    MultiselectComponent,
    CardComponent,
    SearchbarComponent,
    HeaderComponent,
    ReferralsEditComponent,
    ReferralsListComponent,
    PatientCardComponent,
    PractitionerCardComponent,
    ConfirmDialog,
    PatientNextApptComponent,
    AppStoreCTABarComponent
  ],
  exports: [
    FilterPipe,
    EqualPipe,
    AgePipe,
    PhonePipe,
    MultiselectComponent,
    CardComponent,
    SearchbarComponent,
    HeaderComponent,
    ReferralsEditComponent,
    ReferralsListComponent,
    ConfirmDialog,
    PatientCardComponent,
    PractitionerCardComponent,
    PatientNextApptComponent,
    AppStoreCTABarComponent
  ],
  entryComponents: [
    ReferralsEditComponent,
    ConfirmDialog,
    PatientNextApptComponent
  ],
  providers: [
    EqualPipe
  ]
})
export class SharedModule { }
