import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TopicModel} from './topic.model';
import {domain} from '../../fuse-config/rest.api';

@Injectable({
    providedIn: 'root'
})

export class TopicService {
    token = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    constructor(
        private http: HttpClient
    ) {}

    fetchTopic(payload: any) {
        let channelId = payload['channelId'];
        let pageNum = payload['pageNum'];
        return this.http.get<TopicModel[]>(domain + 'channels/' + channelId + '/topics?pages=' + pageNum,
            {
                headers : this.token
            })
    }

    addTopic(payload) {
        return this.http.post<TopicModel[]>(domain + 'topics',
            payload,
            {
                headers: this.token
            })
    }
}