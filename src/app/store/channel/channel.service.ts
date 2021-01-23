import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ChannelModel} from './channel.model';
import {channelURL} from '../../fuse-config/rest.api';

@Injectable({
    providedIn: 'root'
})

export class ChannelService {
    token = localStorage.getItem('token');
    constructor(
        private http: HttpClient
    ) {}

    fetchChannel() {
        return this.http.get<ChannelModel[]>(channelURL,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                }
            })
    }
}