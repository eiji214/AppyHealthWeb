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

@Component({
  selector: 'app-refer-patient',
  templateUrl: './refer-patient.component.html',
  styleUrls: ['./refer-patient.component.scss',
    '../../styles.scss']
})
export class ReferPatientComponent implements OnInit {

  constructor(private referralService: ReferralsService, private route: ActivatedRoute, private patientsService: PatientService
    , private specialtyService: SpecialtyService, private practitionersService: PractitionersService) { }

  patient$: Observable<Patient>;
  filteredPractitioners: Practitioner[];
  selectedPractitioners: any[];
  referral: Referral;

  ngOnInit() {
    this.selectedPractitioners = [];
    this.referral = <Referral>{};
    this.filteredPractitioners = [];

    this.patient$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.patientsService.getPatient(params.get('id')))
    );
  }

  createReferral(patientId) {
    let j = this.selectedPractitioners.length;
    for (let i = 0; i < this.selectedPractitioners.length; i++) {
      this.referral.PractitionerId = this.selectedPractitioners[i].Id;
      this.referral.PatientId = patientId;

      this.referralService.createReferral(this.referral).subscribe((data) => {
        j--;
        if (j === 0) {
          window.location.href = '/app/physician/patients/' + patientId;
        }
      });
    }
  }

  setPractitioners(practitioners: Practitioner[]) {
    this.filteredPractitioners = practitioners;
  }

  canCreateReferral() {
    if (!this.selectedPractitioners || this.selectedPractitioners.length === 0) {
      return false;
    }
    if (!this.referral.Symptom) {
      return false;
    }
    return true;
  }

  toggle(item, list) {
    const idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(item);
    }
  }

  exists(item, list) {
    return list.indexOf(item) > -1;
  }

  isChecked(selectedList, list) {
    if (!list || !selectedList) {
      return false;
    }

    return selectedList.length === list.length;
  }

  toggleAllPractitioners() {
    if (this.selectedPractitioners.length === this.filteredPractitioners.length) {
      this.selectedPractitioners = [];
    } else if (this.selectedPractitioners.length === 0 || this.selectedPractitioners.length > 0) {
      this.selectedPractitioners = this.filteredPractitioners.slice(0);
    }
  }
}
