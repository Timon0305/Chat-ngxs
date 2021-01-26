import {TopicModel} from "./topic.model";

export class FetchTopic {
    static readonly type = '[Topic] Fetch Topic';
    constructor(public payload: any) {}
}

export class ChangeTopic {
    static readonly type = '[Topic] Change Topic';
    constructor(public payload: TopicModel) {}
}

export class AddNewTopic {
    static readonly type = '[Topic] Add New Topic';
    constructor(public payload: any) {}
}