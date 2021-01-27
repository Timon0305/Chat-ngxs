import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MessageModel} from './message.model';
import {domain} from '../../fuse-config/rest.api';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    token = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    userId = localStorage.getItem('userId');
    constructor(
        private http: HttpClient
    ) {}

    fetchMessage(topicId) {
        return this.http.get<MessageModel[]>(domain + 'topics/' + topicId + '/messages',
            {
                headers: this.token
            })
    }

    addNewMessage(payload) {
        return this.http.post<MessageModel[]>(domain + 'message',
            payload,
            {
                headers: this.token
            })
    }
}