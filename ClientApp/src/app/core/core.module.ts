

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NoAccessComponent } from './noaccess/noaccess.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    SidebarComponent,
    DashboardComponent,
    NoAccessComponent
  ],
  exports: [
    SidebarComponent,
    DashboardComponent,
    NoAccessComponent
  ],
  providers: []
})
export class CoreModule { }
