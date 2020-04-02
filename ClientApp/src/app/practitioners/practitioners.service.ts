import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Practitioner, PractitionerLocation } from '../core/model/practitioner';
import { PractitionerFilter } from '../core/model/practitionerFilter';
import { Specialty } from '../core/model/specialty';
import { InsurancePlan } from '../core/model/insurancePlan';
import { Location } from '../core/model/location';
import { Filter } from '../core/model/filter';

@Injectable({
  providedIn: 'root'
})
export class PractitionersService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  getPractitioners(): Observable<Practitioner[]> {
    return this.httpClient.get<Practitioner[]>(this.url + 'get?url=providers/');
   }

  getPractitioner(id: number | string): Observable<Practitioner> {
    return this.httpClient.get<Practitioner>(this.url + 'get?url=providers/' + id);
  }

  savePractitioner(id: number | string, practitioner: Practitioner): Observable<Practitioner> {
    return this.httpClient.post<Practitioner>(this.url + 'post?url=providers/' + id, practitioner);
  }

  createPractitioner(practitioner: Practitioner): Observable<Practitioner> {
    return this.httpClient.post<Practitioner>(this.url + 'post?url=providers/create', practitioner);
  }

  createLocation(practitioner: Practitioner): Observable<PractitionerLocation> {
    return this.httpClient.post<PractitionerLocation>(this.url + 'post?url=providers/createlocation', practitioner);
  }

  deleteLocation(locationId: number) {
    return this.httpClient.delete(this.url + 'delete?url=providers/deletelocation/' + locationId);
  }

  saveLocation(location: Location): Observable<Location> {
    return this.httpClient.put<Location>(this.url + 'put?url=providers/savelocation/', location);
  }

  updatePractitioner(practitioner: Practitioner): Observable<Practitioner> {
    console.log(practitioner);
    return this.httpClient.put<Practitioner>(this.url + 'put?url=providers/Update', practitioner);
  }

  updatePractitionerInsurance(practitioner: Practitioner): Observable<Practitioner> {
    return this.httpClient.put<Practitioner>(this.url + 'put?url=providers/UpdateInsurance', practitioner);
  }

  uploadPhoto(file, providerId) {
    const input = new FormData();
    input.append('file', file);
    return this.httpClient.post<any>(`${this.url}PostForm?url=providers/Photo/${providerId}`, input);
  }

  getSpecialists(filter: Filter): Observable<Practitioner[]> {
    return this.httpClient.post<Practitioner[]>(this.url + 'post?url=providers/Search', filter);
  }

  deletePractitioner(id: number | string) {
    return this.httpClient.delete(this.url + 'delete?url=providers/' + id);
  }

  favoritePractitioner(practitioner: Practitioner): Observable<Practitioner> {
    console.log(practitioner);
    return this.httpClient.put<Practitioner>(this.url + 'put?url=providers/Favorite', practitioner);
  }

  npiLookup(npi: string): Observable<any> {
    return this.httpClient.get<any>(this.url + 'get?url=providers/NpiLookup/' + npi);
  }

  getInsuranceList() {
    return this.httpClient.get<InsurancePlan[]>(this.url + 'get?url=providers/GetInsuranceList');
  }

  saveInsuranceOption(practId: number, insuranceId: number) {
    return this.httpClient.put(this.url + 'put?url=providers/SaveInsurancePlan/' + practId, insuranceId);
  }

  requestPatientDetails(patientId: string | number, provider2Id: string | number, notes: string): Observable<any> {
    //var faxVm = {
    //  PatientId: patientId,
    //  Provider1Id: 0,
    //  Provider2Id: provider2Id,
    //  Notes: notes
    //}

    return this.httpClient.get<any>(this.url + 'get?url=providers/fax/RequestPatientDetailsPdf/' + patientId + '/' + '0' + '/' + provider2Id + '/' + notes);

    //return this.httpClient.post<any>('fax/RequestPatientDetailsPdf/', faxVm);
  }
}
