import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PractitionersService } from '../../practitioners/practitioners.service';
import { Practitioner } from '../../core/model/practitioner';
import { PatientService } from '../patients.service';
import { Patient } from '../../core/model/patient';

import { ReferralsService } from '../../referrals/referrals.service';

@Component({
  selector: 'app-patient-referral',
  templateUrl: './patient-referral.component.html',
  styleUrls: ['./patient-referral.component.scss',
    '../../styles.scss']
})
export class PatientReferralComponent implements OnInit {

  constructor(
    private practitionerService: PractitionersService,
    private patientsService: PatientService,
    private referralsService: ReferralsService,
    private route: ActivatedRoute
  ) { }

  practitioners$: Observable<Practitioner[]>;
  patient$: Observable<Patient>;
  referral$: Observable<Patient>;

  ngOnInit() {
    this.practitioners$ = this.practitionerService.getPractitioners();
    this.patient$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.patientsService.getPatient(params.get('id')))
    );
  }

  createReferral(specialistId, patientId) {
    // this.referralsService.createReferral(specialistId, patientId).subscribe((referral) => {
    //  console.log(referral);

    // });
  }
}
