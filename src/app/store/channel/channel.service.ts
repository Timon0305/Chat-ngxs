import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ChannelModel} from './channel.model';
import {domain} from '../../fuse-config/rest.api';

@Injectable({
    providedIn: 'root'
})

export class ChannelService {
   token = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    constructor(
        private http: HttpClient,
    ) {}

    fetchChannel(page) {
        return this.http.get<ChannelModel[]>(domain + 'channels?page=' + page,
            {
                headers : this.token
            })
    }


    addChannel(payload) {
         return this.http.post<ChannelModel[]>(domain + 'channels',
             payload,
             {
                headers : this.token
             })
    }
}