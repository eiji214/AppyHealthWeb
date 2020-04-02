import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { shareReplay } from "rxjs/operators";

import { User } from './models/user';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = '/api/';

  public user: Observable<User>;

  getUser(): Observable<User> {

    if (!this.user) {
      this.user = this.httpClient
        .get<User>(`${this.baseUrl}get?url=user`)
      .pipe(shareReplay(1));
    }

    return this.user;
     
  }

  saveUser(user: User) :Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}post?url=user/UpdateUserInfo`, user);
  }

  isLoggedIn(): Observable<boolean> {
    return this.httpClient.get<boolean>("/Session/IsLoggedIn");
  }

}
