import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Specialty } from './models/specialty';
import { SearchRecord } from './models/searchrecord';

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {}

  baseUrl = 'https://appyhealthapitest.azurewebsites.net/api/';

  getSpecialty(): Observable<Specialty[]> {
    return this.httpClient.get<Specialty[]>(`${this.baseUrl}specialty/v2`);
  }

  callSearchWeb(body): Observable<SearchRecord[]> {
    return this.httpClient.post<SearchRecord[]>(`${this.baseUrl}providers/CallSearchWeb`, body);
  }

  discoverByCategory(body): Observable<SearchRecord[]> {
    return this.httpClient.post<SearchRecord[]>(`${this.baseUrl}providers/DiscoverByCategory`, body);
  }

  getProviders(id): Observable<any[]> {
    return this.httpClient.get<SearchRecord[]>(`${this.baseUrl}providers/Get/${id}`);
  }

  getProvidersFromSearch(data: any): Observable<any[]> {
    return this.httpClient.post<any>(`${this.baseUrl}providers/GetProvidersFromSearch`, data);
  }

  getHealthSystem(id): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}healthsystem/Get/${id}`);
  }
}
