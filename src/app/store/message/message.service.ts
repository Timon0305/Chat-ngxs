import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MessageModel} from './message.model';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    constructor(
        private http: HttpClient
    ) {}

    fetchMessage() {
        return this.http.get<MessageModel[]>('api/chat-message')
    }
}