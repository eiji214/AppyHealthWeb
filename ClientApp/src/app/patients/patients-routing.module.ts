import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsLayoutComponent } from './layout/patients-layout.component';

import { PatientsComponent } from './patients/patients.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientReferralComponent } from './patient-referral/patient-referral.component';
import { PatientEligibilityComponent } from './patient-eligibility/patient-eligibility.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsLayoutComponent,
    children: [
      { path: '', component: PatientsComponent },
      { path: ':id', component: PatientDetailComponent },
      { path: 'referral/:id', component: PatientReferralComponent },
      { path: 'eligibility/:id', component: PatientEligibilityComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PatientsRoutingModule { }
