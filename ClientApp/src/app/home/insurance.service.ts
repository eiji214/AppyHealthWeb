import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Insurance } from './models/insurance';

@Injectable()
export class InsuranceService {

  constructor(private httpClient: HttpClient) {}

  baseUrl = 'https://appyhealthapitest.azurewebsites.net/api/insurancePlan';

  getInsurance(): Observable<Insurance[]> {
    return this.httpClient.get<Insurance[]>(`${this.baseUrl}`);
  }
}
