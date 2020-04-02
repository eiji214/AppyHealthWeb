import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from "../auth/auth.service";
import { LoginGuard } from "../auth/loginGuard";

import { PhysicianLayoutComponent } from "./layout/physician-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MidLevelProfileComponent } from "./profile/mid-level/mid-level-profile.component";
import { StaffProfileComponent } from "./profile/staff/staff-profile.component";
import { PhysicianProfileComponent } from "./profile/physician/physician-profile.component";
import { PracticeProfileComponent } from "./profile/practice/practice-profile.component";
import { EditProfileComponent } from "./profile/editProfile.component";
import { SetupComponent } from "./setup/setup.component";
import { PhysicianProfilesComponent } from './profile/physician/physician-profiles/physician-profiles.component';
import { PracticeProfilesComponent } from './profile/practice/practice-profiles/practice-profiles.component';
import { MidLevelProfilesComponent } from './profile/mid-level/mid-level-profiles/mid-level-profiles.component';
import { StaffProfilesComponent } from './profile/staff/staff-profiles/staff-profiles.component';


const routes: Routes = [
  {
    path: 'physician',
    component: PhysicianLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
      { path: 'profile', component: PhysicianProfileComponent },
      { path: 'profile/physicianprofiles', component: PhysicianProfilesComponent },
      { path: 'profile/midlevelprofiles', component: MidLevelProfilesComponent },
      //{ path: 'profile/staffprofiles', component: StaffProfilesComponent },
      { path: 'profile/physicianprofile', component: PhysicianProfileComponent },
      { path: 'profile/midlevelprofile', component: MidLevelProfileComponent },
      //{ path: 'profile/staffprofile', component: StaffProfileComponent },
      { path: 'profile/edit', component: EditProfileComponent },
      { path: 'profile/setup', component: SetupComponent },
      { path: 'patients', loadChildren: '../patients/patients.module#PatientsModule' },
      { path: 'practitioners', loadChildren: '../practitioners/practitioners.module#PractitionersModule' },
      { path: 'referrals', loadChildren: '../referrals/referrals.module#ReferralsModule' },
      { path: 'appointments', loadChildren: './appointments/appointments.module#AppointmentsModule' },
    ]
  },
  {
    path: 'practice',
    component: PhysicianLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: PracticeProfileComponent },
      { path: 'profile/edit', component: PracticeProfileComponent },
      { path: 'profiles', component: PracticeProfilesComponent },
      { path: 'profile/setup', component: SetupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianRoutingModule { }
