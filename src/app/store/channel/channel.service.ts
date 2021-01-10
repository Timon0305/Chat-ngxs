import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ChannelModel} from './channel.model';

@Injectable({
    providedIn: 'root'
})

export class ChannelService {

    constructor(
        private http: HttpClient
    ) {}

    fetchChannel() {
        return this.http.get<ChannelModel[]>('api/chat-channel')
    }
}