import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgbModalModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PhysicianRoutingModule } from './physician-routing.module';

import { PhysicianService } from './physician.service';
import { UserService } from '../common/user.service';

import { PhysicianLayoutComponent } from './layout/physician-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MidLevelProfileComponent } from './profile/mid-level/mid-level-profile.component';
import { PhysicianProfileComponent } from './profile/physician/physician-profile.component';
// import { StaffProfileComponent } from "./profile/staff/staff-profile.component";
import { PracticeProfileComponent } from './profile/practice/practice-profile.component';
import { EditProfileComponent } from './profile/editProfile.component';


import { SetupComponent } from './setup/setup.component';
import { HeaderComponent } from './setup/header.component';
import { PracticeSetupComponent } from './setup/practice/practice-setup.component';
import { PhysicianSetupComponent } from './setup/physician/physician-setup.component';
import { MidLevelSetupComponent } from './setup/midLevel/midlevel-setup.component';
import { StaffSetupComponent } from './setup/staff/staff-setup.component';
import { ConfirmSetupComponent } from './setup/confirm.component';
import { ActivateSetupComponent } from './setup/activate.component';
import { CheckoutSetupComponent } from './setup/checkout.component';

import { PracticeDialogComponent } from './setup/practice/practice-dialog.component';
import { PhysicianDialogComponent } from './setup/physician/physician-dialog.component';
import { MidLevelDialogComponent } from './setup/midLevel/midlevel-dialog.component';
import { StaffDialogComponent } from './setup/staff/staff-dialog.component';

import { PhonePipe } from '../common/pipes/phone.pipe';
import { MaterialModule } from '../material/material-module';
import { AgmCoreModule } from '@agm/core';
import { PhysicianProfilesComponent } from './profile/physician/physician-profiles/physician-profiles.component';
import { PracticeOverviewEditComponent } from './profile/practice/practice-overview-edit/practice-overview-edit.component';
import { PracticeProfilesComponent } from './profile/practice/practice-profiles/practice-profiles.component';
import { PracticeAdminStaffEditComponent } from './profile/practice/practice-admin-staff-edit/practice-admin-staff-edit.component';
import { MidLevelProfilesComponent } from './profile/mid-level/mid-level-profiles/mid-level-profiles.component';
// import { StaffProfilesComponent } from './profile/staff/staff-profiles/staff-profiles.component';

import { AuthService } from '../auth/auth.service';
import { LoginGuard } from '../auth/loginGuard';

@NgModule({
  imports: [
    PhysicianRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgbModalModule,
    NgbCollapseModule,
    MaterialModule,
    AgmCoreModule
  ],
  providers: [
    PhysicianService,
    UserService,
    AuthService,
    LoginGuard
  ],
  declarations: [
    PhysicianLayoutComponent,
    DashboardComponent,
    MidLevelProfileComponent,
    PracticeSetupComponent,
    // StaffProfileComponent,
    PhysicianProfileComponent,
    PracticeProfileComponent,
    EditProfileComponent,
    SetupComponent,
    HeaderComponent,
    PhysicianSetupComponent,
    MidLevelSetupComponent,
    StaffSetupComponent,
    ConfirmSetupComponent,
    ActivateSetupComponent,
    CheckoutSetupComponent,
    PracticeDialogComponent,
    PhysicianDialogComponent,
    MidLevelDialogComponent,
    StaffDialogComponent,
    PhonePipe,
    PhysicianProfilesComponent,
    PracticeOverviewEditComponent,
    PracticeAdminStaffEditComponent,
    PracticeProfilesComponent,
    MidLevelProfilesComponent,
    // StaffProfilesComponent,
],
entryComponents: [
  PracticeOverviewEditComponent,
  PracticeAdminStaffEditComponent,
  PracticeDialogComponent,
  PhysicianDialogComponent,
  MidLevelDialogComponent,
  StaffDialogComponent,
],
  bootstrap: [PhysicianLayoutComponent]
})
export class PhysicianModule { }

