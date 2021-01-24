import {TopicModel} from "./topic.model";

export class FetchTopic {
    static readonly type = '[Topic] Fetch Topic';
    constructor(public payload: string) {}
}

export class ChangeTopic {
    static readonly type = '[Topic] Change Topic';
    constructor(public payload: TopicModel) {}
}