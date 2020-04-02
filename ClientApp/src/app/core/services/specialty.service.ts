import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Specialty } from '../model/specialty';


@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  getSpecialties(): Observable<Specialty[]> {
    return this.httpClient.get<Specialty[]>(this.url + 'get?url=specialty/');
   }
}
