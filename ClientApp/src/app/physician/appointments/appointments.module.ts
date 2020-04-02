import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material-module';

import { AppointmentsRoutingModule } from './appointments-routing.module';

import { AppointmentsService } from "./appointments.service";

import { CalendarComponent } from "./calendar/calendar.component";
import { AppointmentDialogComponent } from "./dialog/appointment-dialog.component";
import { MainComponent } from "./main/main.component";
import { WeekComponent } from "./week/week.component";


@NgModule({
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [
    AppointmentsService
  ],
  declarations: [
    CalendarComponent,
    AppointmentDialogComponent,
    MainComponent,
    WeekComponent
  ],
  entryComponents: [
    AppointmentDialogComponent
  ]
})
export class AppointmentsModule { }
