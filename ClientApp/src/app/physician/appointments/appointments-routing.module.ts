import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';


const appointmentsRoutes: Routes = [
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(appointmentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppointmentsRoutingModule { }
