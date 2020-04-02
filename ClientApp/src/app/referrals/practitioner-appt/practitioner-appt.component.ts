import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ReferralsService } from '../referrals.service';

import { PatientService } from '../../patients/patients.service';
import { SpecialtyService } from '../../core/services/specialty.service';
import { PractitionersService } from '../../practitioners/practitioners.service';
import { Patient } from '../../core/model/patient';

import { Specialty } from '../../core/model/specialty';
import { Practitioner } from '../../core/model/practitioner';
import { PractitionerFilter } from '../../core/model/practitionerFilter';
import { Referral } from '../../core/model/referral';
import { User } from '../../core/model/user';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-practitioner-appt',
  templateUrl: './practitioner-appt.component.html',
  styleUrls: ['./practitioner-appt.component.scss']
})
export class PractitionerApptComponent implements OnInit {

  constructor(private referralService: ReferralsService, private route: ActivatedRoute, private patientsService: PatientService
    , private specialtyService: SpecialtyService, private practitionersService: PractitionersService, private userService: UserService) { }

  patient$: Observable<Patient>;
  specialties: Specialty[];
  practitioners: Practitioner[];
  filteredPractitioners: Practitioner[];
  filter: PractitionerFilter;
  selectedPractitioners: any[];
  referral: Referral;
  user: User;

  ngOnInit() {
    this.selectedPractitioners = [];

    this.referral = <Referral>{};
    this.filteredPractitioners = [];
    this.practitioners = [];

    this.patient$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.patientsService.getPatient(params.get('id')))
    );

    this.userService.getMe().subscribe(x => this.user = x);
  }

  createReferral(patientId) {
    this.referral.PractitionerId = this.user.Practitioner.Id;
    this.referral.PatientId = patientId;

    this.referralService.createReferral(this.referral).subscribe((data) => {
      window.location.href = '/app/physician/patients/' + patientId;
    });
  }

  canCreateReferral() {
    if (!this.referral.Symptom) {
      return false;
    }
    return true;
  }
}
