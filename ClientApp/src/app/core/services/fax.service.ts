import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { InsurancePlan } from '../model/insurancePlan';
import { InsuranceServiceType } from '../model/insuranceServiceType';

@Injectable({
  providedIn: 'root'
})
export class FaxService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  requestPatientDetails(patientId: string | number, provider2Id: string | number, notes: string): Observable<any> {
    //var faxVm = {
    //  PatientId: patientId,
    //  Provider1Id: 0,
    //  Provider2Id: provider2Id,
    //  Notes: notes
    //}

    return this.httpClient.post<any>(this.url + 'post?url=SendFax/' + patientId + '/' + provider2Id + '/' + notes, notes);

    //return this.httpClient.post<any>('fax/RequestPatientDetailsPdf/', faxVm);
  }
}
