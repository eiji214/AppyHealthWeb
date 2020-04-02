import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';
  id: number;
  tokenId: string;
  headers: Headers;
  stripe: Stripe;


  paymentRequest(token: any) {
    this.stripe = {
      Token: token.id
    };
    return this.httpClient.post<Stripe>(this.url + 'post?url=payment/charge', this.stripe);
  }

  getStripePublicKey(): Observable<any> {
    return this.httpClient.get<any>(this.url + 'get?url=payment/GetStripePublicKey');
  }
}

export interface Stripe {
  Token: string;
}
