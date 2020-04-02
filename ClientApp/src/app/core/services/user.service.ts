import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../model/user';
import { Practitioner } from '../model/practitioner';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  getMe(): Observable<User> {
    return this.httpClient.get<User>(this.url + 'get?url=user/');
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + 'get?url=user/all');
  }

  getAppyHealthUsers(searchTerm:string):Observable<User[]>{
    return this.httpClient.get<User[]>(encodeURI(this.url + 'get?url=user/appyhealth/?searchTerm=' + searchTerm));
  }

  getProviders(status:string,searchTerm:string):Observable<User[]>{
    return this.httpClient.get<User[]>(encodeURI(this.url + 'get?url=user/providers/?status=' + status +'&searchTerm=' + searchTerm));
  }

  searchUsers(searchTerm:string): Observable<User[]> {
    return this.httpClient.get<User[]>(encodeURI(this.url + 'get?url=user/search/' + searchTerm));
  }

  confirm(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url + 'post?url=user/confirm', user);
  }

  createPractitionerUser(user: Practitioner): Observable<Practitioner> {
    return this.httpClient.post<Practitioner>(this.url + 'post?url=user/create', user);
  }

  impersonatePractitioner(practitionerId: number): Observable<string> {
    return this.httpClient.get<string>(this.url + 'get?url=user/ImpersonatePractitioner/' + practitionerId);
  }

  stopImpersonating(): Observable<string> {
    return this.httpClient.get<string>(this.url + 'get?url=user/StopImpersonating/');
  }

  getRoles() : Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.url + 'get?url=user/roles');
  }

  saveUser(user: User): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.url}post?url=user/UpdateUserInfo`, user);
  }
}
