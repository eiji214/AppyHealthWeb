import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  loggedIn: Promise<boolean>;
  l: boolean;
  l1: boolean;
  constructor(private httpClient: HttpClient) { }

  async isLoggedIn() {
    if (!this.l) {
      this.l1 = await this.httpClient
        .get<boolean>("/Session/IsLoggedIn")
        .toPromise()
        .then(resp => {
          this.l = true;
          return true;
        })
        .catch(resp => {
          this.l = false;
          return false;
        });
    }

    return this.l;
  }
}
