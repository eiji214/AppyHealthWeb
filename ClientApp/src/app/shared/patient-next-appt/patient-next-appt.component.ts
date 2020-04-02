import { Component, OnInit, Input, Inject } from '@angular/core';
import { PractitionerAvailability } from '../../core/model/practitionerAvailability';
import { ReferralsService } from '../../referrals/referrals.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Referral } from '../../core/model/referral';

@Component({
    selector: 'app-patient-next-appt',
    templateUrl: './patient-next-appt.component.html',
    styleUrls: ['./patient-next-appt.component.scss']
  })
  export class PatientNextApptComponent implements OnInit {
    constructor(
      private referralService: ReferralsService,
      public dialogRef: MatDialogRef<PatientNextApptComponent>,
      @Inject(MAT_DIALOG_DATA) public referral: Referral) {
      console.log(referral);
      if (referral.PractitionerAvailability.length) {
        const selectedTime = referral.PractitionerAvailability.find(x => x.SelectedByUser);
        if (selectedTime) {
          this.selectedAppointmentTime = selectedTime.AppointmentDate;
        }
      }
    }
  
    @Input() patientId: number;
    newAppointmentDate: Date;
    newAppointmentTime: string;
    selectedAppointmentTime: Date;
    availableTimes: any;
  
    ngOnInit() {
      this.availableTimes = this.getTimeOptions();
      this.newAppointmentTime = "6:00"; // 6am
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    addPractitionerAvailability() {
      if (!this.newAppointmentDate || !this.newAppointmentTime) {
        return;
      }
  
      const time = this.newAppointmentTime.substring(0, 5).split(':');
      const hours = +time[0] + (this.newAppointmentTime.indexOf('PM') === -1 ? 0 : 12);
      const minutes = +time[1];
      this.newAppointmentDate.setHours(hours, minutes, 0);
  
      this.referral.PractitionerAvailability.push({
        ReferralId: this.referral.Id,
        AppointmentDate: this.newAppointmentDate,
        PractitionerID: this.referral.PractitionerId,
        ID: 0,
        SelectedByUser: false
      });
      this.newAppointmentDate = null;
      this.newAppointmentTime = null;
      this.updateReferral();
    }
  
    removePractitionerAvailability(availability: PractitionerAvailability, event) {
      event.stopPropagation();
      const idx = this.referral.PractitionerAvailability.indexOf(availability);
      if (idx !== -1) {
        this.referral.PractitionerAvailability.splice(idx, 1);
      }
      this.updateReferral();
    }
  
    confirmAppointment() {
      this.referral.AppointmentDate = this.selectedAppointmentTime;
      this.updateReferral();
      window.location.reload();
    }

    setAppointmentDate()
    {
      if (!this.newAppointmentDate || !this.newAppointmentTime) {
        return;
      }
  
      const time = this.newAppointmentTime.substring(0, 5).split(':');
      const hours = +time[0] + (this.newAppointmentTime.indexOf('PM') === -1 ? 0 : 12);
      const minutes = +time[1];
      this.newAppointmentDate.setHours(hours, minutes, 0);
  
      this.referral.PractitionerAvailability.push({
        ReferralId: this.referral.Id,
        AppointmentDate: this.newAppointmentDate,
        PractitionerID: this.referral.Practitioner.Id,
        ID: 0,
        SelectedByUser: false
      });
      this.selectedAppointmentTime = this.newAppointmentDate;
      this.newAppointmentDate = null;
      this.newAppointmentTime = null;
    }
  
    close() {
      this.dialogRef.close();
    }
  
  updateReferral() {
    this.referral.ConfirmedByPatient = true;
      this.referralService.updateAvailability(this.referral).subscribe(
        referral => {
          this.referral.Status = referral.Status;
        });
    }
  
    getTimeOptions() {
      var options = [];
      var hours, minutes, ampm;
      for (var i = 0 * 60; i <= 24 * 60 - 1; i += 15) {
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (minutes < 10) {
          minutes = '0' + minutes; // adding leading zero
        }
  
        var timeOption = { value: hours + ":" + minutes, viewValue: '' };
  
        ampm = hours % 24 < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        if (hours === 0) {
          hours = 12;
        }
  
        timeOption.viewValue = hours + ":" + minutes + ' ' + ampm;
  
        options.push(timeOption);
      }
  
      return options;
    }
  }
