import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  getLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.url + 'get&url=Location/');
  }

  createLocation(location: Location): Observable<Location> {
    return this.httpClient.post<Location>(this.url + 'post?url=Location/Create', location);
  }
}
