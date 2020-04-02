import { Component, Input } from '@angular/core';
import { Referral } from '../../core/model/referral';
import { MatDialog } from '@angular/material';
import { ReferralsEditComponent } from '../referrals-edit/referrals-edit.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { ReferralsService } from '../../referrals/referrals.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { PatientNextApptComponent } from '../patient-next-appt/patient-next-appt.component';
import { Practitioner } from '../../core/model/practitioner';

@Component({
  selector: 'app-referrals-list',
  templateUrl: './referrals-list.component.html',
  styleUrls: ['./referrals-list.component.scss']
})
export class ReferralsListComponent {


  @Input() referrals: BehaviorSubject<Referral[]>;

  FromPractitioner: {
    FullName: string
  };
  referral: Referral;
  newReferral: Referral;

  statuses = ['Created', 'Patient Availability Set', 'Provider Availability Set', 'User Selected Appointment', 'Appointment Scheduled'];

  constructor(public referralService: ReferralsService, public dialog: MatDialog) { }

  getStatusIndex(status) {
    return this.statuses.indexOf(status);
  }

  setAppointment(referralId: number, event) {
    event.stopPropagation();
    this.referralService.getReferral(referralId).subscribe(x => {
      this.dialog.open(ReferralsEditComponent, { data: x });
    });
  }

  setNextAppointment(referralId: number, patientId: number, provider: Practitioner) {
    this.referralService.getReferral(referralId).subscribe(d => {
      this.referral = d;
      if (d == null) {
        this.newReferral.PractitionerId = provider.Id;
        this.newReferral.PatientId = patientId;

        this.referralService.createReferral(this.newReferral).subscribe((x) => {
          this.newReferral = x;
          this.dialog.open(PatientNextApptComponent, { data: this.newReferral });
        });
      } else {
        this.dialog.open(PatientNextApptComponent, { data: this.referral });
      }
    });
  }

  deactivateReferral(referralId) {
    this.referralService.deactivateReferral(referralId).subscribe(result => {
      const abc = result;
    });

    window.location.reload(false);

    // for (var i = 0; i < this.referrals.length; i++) {
    //  var removedReferral = this.referrals.find(y => y.Id === referralId);
    //  this.referrals.splice(this.referrals.indexOf(removedReferral), 1);
    // }
  }

  openDeactivateReferralDialog(referralId) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { entryId: referralId, confirmTitle: 'Would you like to delete this referral?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deactivateReferral(result);
      }
    });
  }
}
