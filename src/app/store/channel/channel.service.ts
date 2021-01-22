import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ChannelModel} from './channel.model';
import {channelURL} from '../../fuse-config/rest.api';

@Injectable({
    providedIn: 'root'
})

export class ChannelService {

    constructor(
        private http: HttpClient
    ) {}

    fetchChannel() {
        return this.http.get<ChannelModel[]>(channelURL,
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1MGU0OTdkYS1kOTFjLTRiNDEtOWZkZi03MDcyYjcyZGJkMGEiLCJ1c2VySWQiOiJmNGRjZDg4OC04YTQwLTQ3OTYtOWFmYS02YmI1MmViZGM1ZGMiLCJzcGFjZUlkIjoiODZmZjc4NjYtZjg0Ny00NjI4LWI3NWMtNWYxYTc4ODk5YzM1IiwiaWF0IjoxNjA5NDQ0MDk1LCJleHAiOjE2MTIwMzYwOTUsImF1ZCI6ImF1ZGllbmNlIiwiaXNzIjoiMzY2IE9wbGVpZGluZ3NwbGF0Zm9ybSIsInN1YiI6ImluZm9AMzY2Lm5sIn0.cN1Z6_VjbpSAqhDeG-GQRqcBu9n7I0fWY9jqJtQAazg',
                }
            })
    }
}