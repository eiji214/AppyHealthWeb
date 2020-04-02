import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Symptom } from '../model/symptom';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';
  userId = 2;

  getSymptoms(): Observable<Symptom[]> {
    return this.httpClient.get<Symptom[]>(this.url + 'get?url=symptoms/');
  }

  getSymptom(id: number | string): Observable<Symptom> {
    return this.httpClient.get<Symptom>(this.url + 'get?url=symptoms/' + id);
  }

  createSymptom(symptom: Symptom): Observable<Symptom> {
    console.log(symptom);
    return this.httpClient.post<Symptom>(this.url + 'post?url=symptoms/create', symptom);
  }

  updateSymptom(symptom: Symptom): Observable<Symptom> {
    console.log(symptom);
    return this.httpClient.put<Symptom>(this.url + 'put?url=symptoms/Update', symptom);
  }
}
