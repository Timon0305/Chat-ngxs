import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TopicModel} from './topic.model';

@Injectable({
    providedIn: 'root'
})

export class TopicService {

    constructor(
        private http: HttpClient
    ) {}

    fetchTopic() {
        return this.http.get<TopicModel[]>('api/chat-topic')
    }
}