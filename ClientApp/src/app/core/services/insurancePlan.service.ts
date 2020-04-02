import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { InsurancePlan } from '../model/insurancePlan';
import { InsuranceServiceType } from '../model/insuranceServiceType';

@Injectable({
  providedIn: 'root'
})
export class InsurancePlanService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  getInsurancePlans(): Observable<InsurancePlan[]> {
    return this.httpClient.get<InsurancePlan[]>(this.url + 'get?url=insurancePlan/');
  }

  getInsuranceServiceType(): Observable<InsuranceServiceType[]> {
    return this.httpClient.get<InsuranceServiceType[]>(this.url + 'get?url=insurancePlan/GetInsuranceServiceType');
  }

  getEligibility(patientId: string | number): Observable<string> {
    return this.httpClient.get<string>(this.url + 'get?url=insurancePlan/GetEligibility/' + patientId);
  }
}
