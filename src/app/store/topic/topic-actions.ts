import {TopicModel} from './topic-model';

export class FetchAllTopic {
    static readonly type = '[Topic] Fetch All'
}

export class ChangeTopic {
    static readonly type = '[Topic] Change Topic';
    constructor(public payload: TopicModel) {}
}