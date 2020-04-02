import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Procedure } from '../model/procedure';


@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  getProcedures(): Observable<Procedure[]> {
    return this.httpClient.get<Procedure[]>(this.url + 'get?url=procedure/');
  }

  createProcedure(name: string): Observable<Procedure> {
    const procedure = { Name: name };

    return this.httpClient.post<Procedure>(this.url + 'post?url=procedure/Create', procedure);
  }
}
