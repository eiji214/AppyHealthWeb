import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Referral } from '../../core/model/referral';
import { Associate } from "./models/associate";


@Injectable()
export class AppointmentsService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = '/api/';

  getAssociates(): Observable<Associate[]> {
    return this.httpClient.get<Associate[]>(this.baseUrl + `get?url=user/myassociates`);
  }

  getReferrals(practitionerId: number): Observable<Referral[]> {
    //let today = new Date();
    //let yyyy = today.getFullYear();
    //let m = today.getMonth() + 1;
    //let d = today.getDate();
    return this.httpClient.get<Referral[]>(this.baseUrl + `get?url=GetPractitionerNewPatientDashboard/${practitionerId}`);
  }

  getPracticeIncoming(): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.baseUrl + `get?url=referrals/PracticeIncoming`);
  }

  getPracticePatient(): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.baseUrl + `get?url=referrals/PracticePatient`);
  }

  createReferral(referral: Referral): Observable<Referral> {
    return this.httpClient.post<Referral>(this.baseUrl + 'post?url=referrals/CreateReferral', referral);
  }
}
