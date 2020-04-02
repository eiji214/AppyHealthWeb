import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PractitionersLayoutComponent } from './layout/practitioners-layout.component';

import { PractitionersListComponent } from './practitioners-list/practitioners-list.component';
import { PractitionerDetailComponent } from './practitioner-detail/practitioner-detail.component';
import { PractitionerNewComponent } from './practitioner-new/practitioner-new.component';

const practitionersRoutes: Routes = [
  {
    path: '',
    component: PractitionersLayoutComponent,
    children: [
      { path: '', component: PractitionersListComponent },
      { path: 'new', component: PractitionerNewComponent },
      { path: ':id', component: PractitionerDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(practitionersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PractitionersRoutingModule { }
