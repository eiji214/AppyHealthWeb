
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { ChatMessage } from '../model/chatMessage';
import { Chat } from '../model/chat';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) {}

  url = '/api/';
  userId = 2;

  getChatMessages(fromUserId: number, toUserId: number): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.url + 'GetChatMessages/' + toUserId + '/' + fromUserId);
  }

  markMessageAsRead(fromUserId: number, toUserId: number): Observable<ChatMessage[]> {
    const vm = { ToUserId: toUserId, FromUserId: fromUserId };

    return this.httpClient.put<ChatMessage[]>(this.url + 'MarkMessageAsRead/', vm);
  }

  markMessageAsUnread(fromUserId: number, toUserId: number): Observable<ChatMessage[]> {
    const vm = { ToUserId: toUserId, FromUserId: fromUserId };

    return this.httpClient.put<ChatMessage[]>(this.url + 'MarkMessageAsUnread/', vm);
  }

  getChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(this.url + 'GetChats/');
  }

  getNewChatMessages(lastMessageId): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.url + 'GetNewMessages/' + lastMessageId + '/' + this.userId);
  }

  createChatMessage(chatMessage: ChatMessage): Observable<ChatMessage> {
    console.log(chatMessage);
    return this.httpClient.post<ChatMessage>(this.url + 'Create', chatMessage);
  }

  startChat(toUserId: number): Observable<ChatMessage> {
    const vm = { ToUserId: toUserId };

    return this.httpClient.post<ChatMessage>(this.url + 'StartChat', vm);
  }

  // deleteChatMessage(id: number | string) {
  //  this.httpClient.delete(this.url + "Delete/" + id);
  // }


}
