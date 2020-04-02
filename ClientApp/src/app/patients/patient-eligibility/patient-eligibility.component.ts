import { Component, OnInit, Provider } from '@angular/core';
import { Subject, Observable, of, concat } from 'rxjs';

import { InsurancePlanService } from '../../core/services/insurancePlan.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { InsuranceServiceType } from '../../core/model/insuranceServiceType';
import { PractitionersService } from '../../practitioners/practitioners.service';



@Component({
  selector: 'app-patient-eligibility',
  templateUrl: './patient-eligibility.component.html',
  styleUrls: ['./patient-eligibility.component.scss',
  '../../styles.scss']
})
export class PatientEligibilityComponent implements OnInit {

  constructor(
    private insurancePlanService: InsurancePlanService,
    private route: ActivatedRoute,
    private practitionersService: PractitionersService) { }

  result$: Observable<string>;
  serviceTypes$: Observable<InsuranceServiceType[]>;
  serviceType: string;
  providerId: number;

  providers$: Observable<Provider[]>;
  isLoadingProviders = false;
  providersInput$ = new Subject<string>();

  ngOnInit() {
    this.serviceTypes$ = this.insurancePlanService.getInsuranceServiceType();
    this.serviceType = 'health_benefit_plan_coverage';
    this.searchProviders();
  }

  getEligibility() {
    if (!this.providerId) {
      this.providerId = 0;
    }

    this.result$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.insurancePlanService.getEligibility(params.get('id')))
    );
  }

  searchProviders() {
    this.providers$ = concat(
      of([]), // default items
      this.providersInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.isLoadingProviders = true),
        switchMap(term => this.practitionersService.getSpecialists({ SearchTerm: term, SpecialtyId: null, SpecialtyName: null }).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.isLoadingProviders = false)
        ))
      )
    );
  }
}
