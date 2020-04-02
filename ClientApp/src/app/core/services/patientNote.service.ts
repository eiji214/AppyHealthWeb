
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { PatientNote } from '../model/patientNote';

@Injectable({
  providedIn: 'root'
})
export class PatientNoteService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';
  userId = 2;

  getPatientNotes(patientId: number | string): Observable<PatientNote[]> {
    return this.httpClient.get<PatientNote[]>(this.url + 'get?url=patientNotes/GetPatientNotes/' + patientId);
  }

  createPatientNote(patientNote: PatientNote): Observable<PatientNote> {
    console.log(patientNote);
    return this.httpClient.post<PatientNote>(this.url + 'post?url=patientNotes/Create', patientNote);
  }

  // deletePatientNote(id: number | string) {
  //  this.httpClient.delete(this.url + "Delete/" + id);
  // }


}
