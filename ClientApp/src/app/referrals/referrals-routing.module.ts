import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReferralsComponent } from './referrals/referrals.component';
import { ReferPatientComponent } from './refer-patient/refer-patient.component';
import { PractitionerApptComponent } from './practitioner-appt/practitioner-appt.component';


const referralsRoutes: Routes = [
  { path: '', component: ReferralsComponent },
  { path: ':id', component: ReferPatientComponent },
  { path: ':id/:practitionerId', component: PractitionerApptComponent }

];

@NgModule({
  imports: [
      RouterModule.forChild(referralsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReferralRoutingModule { }
