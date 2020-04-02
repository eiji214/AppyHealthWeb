import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppointmentsService } from "../appointments.service";

import { Referral } from '../../../core/model/referral';

@Component({
  selector: 'appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent {

  referral: Referral;

  buttonText: string;
  headerText: string;

  constructor(
    private appointmentsService: AppointmentsService,
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.appointment) {
      this.buttonText = "Save Changes";
      this.headerText = "Edit";
    } else {
      this.headerText = "Add";
      this.buttonText = "Add Appointment";
    }

    this.referral = <Referral>{};
    this.referral.PractitionerId = data.practitionerId;
    this.referral.AppointmentDate = data.date.date;
  }

  close() {
    this.dialogRef.close();
  }

  add(): void {
    this.appointmentsService.createReferral(this.referral)
      .subscribe(result => {
        this.dialogRef.close({});
      })
    
  }


}
