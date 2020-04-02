import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Patient } from '../core/model/patient';
import { EmailMessage } from '../core/model/emailMessage';


@Injectable()
export class PatientService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  getFilters(): any {
    const filter = {
      searchText: '', filters:
        [
          { ParentCategory: 'Specialty', ChildCategories:
          [{ Name: 'Allergy & Immunology', Id: 1 },
          { Name: 'Anatomic/Clinical Pathology', Id: 1 },
          { Name: 'Anesthesialogy', Id: 1 },
          { Name: 'Cardiovascular Disease', Id: 1 }] },
          { ParentCategory: 'Hospital', ChildCategories:
          [{ Name: 'Hosp1', Id: 1 }, { Name: 'Hosp2', Id: 2 }] }
        ]
    };

    return filter;
  }

  getPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.url + 'get?url=patients');
   }

   getPatientsFTS(searchTerm:string): Observable<Patient[]> {
     return this.httpClient.get<Patient[]>(encodeURI(this.url + 'get?url=patients/GetFTS/' + searchTerm));
   }

  getPatient(id: number | string): Observable<Patient> {
    return this.httpClient.get<Patient>(this.url + 'get?url=patients/' + id);
  }

  createPatient(patient: Patient): Observable<Patient> {
    console.log(patient);
    return this.httpClient.post<Patient>(this.url + 'post?url=patients/Create', patient);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    console.log(patient);
    return this.httpClient.put<Patient>(this.url + 'put?url=patients/Update', patient);
  }

  updatePatientInsurance(patient: Patient): Observable<Patient> {
    return this.httpClient.put<Patient>(this.url + 'put?url=patients/UpdateInsurance', patient);
  }


  deletePatient(id: number | string) {
    this.httpClient.delete(this.url + 'delete`?url=patients/Delete/' + id);
  }

  deactivatePatient(id: number | string): any {
    this.httpClient.delete(this.url + 'delete?url=patients/Deactivate/' + id);
  }

  sendMessage(patientId: number | string, emailMessage: EmailMessage): Observable<Patient> {
    console.log(emailMessage);
    return this.httpClient.post<Patient>(this.url + 'post?url=patients/SendMessage/' + patientId, emailMessage);
  }

  getLandingPagePatients(searchTerm:string){
    return this.httpClient.get<Patient[]>(encodeURI(this.url + 'get?url=patients/GetLandingPage/?searchTerm=' + searchTerm));
  }

}
