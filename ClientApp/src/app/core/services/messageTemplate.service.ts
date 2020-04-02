import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MessageTemplate } from '../model/messageTemplate';


@Injectable({
  providedIn: 'root'
})
export class MessageTemplateService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';

  getMessageTemplates(): Observable<MessageTemplate[]> {
    return this.httpClient.get<MessageTemplate[]>(this.url+'get?url=messageTemplates/');
   }

  getMessageTemplate(id: number | string): Observable<MessageTemplate> {
    return this.httpClient.get<MessageTemplate>(this.url + 'get?url=messageTemplates/' + id);
  }

  createMessageTemplate(patient: MessageTemplate): Observable<MessageTemplate> {
    console.log(patient);
    return this.httpClient.post<MessageTemplate>(this.url + 'post?url=messageTemplates/Create', patient);
  }

  updateMessageTemplate(patient: MessageTemplate): Observable<MessageTemplate> {
    console.log(patient);
    return this.httpClient.put<MessageTemplate>(this.url + 'put?url=messageTemplates/Update', patient);
  }

  deleteMessageTemplate(id: number | string) {
    this.httpClient.delete(this.url + 'delete?url=messageTemplates/Delete/' + id);
  }

  deactivateMessageTemplate(id: number | string): any {
    this.httpClient.delete(this.url + 'delete?url=messageTemplates/Deactivate/' + id);
  }
}
