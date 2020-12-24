import {TopicModel} from './topic-model';

export namespace TopicActions {
    export class FetchAllMessage {
        static readonly type = '[Topic] Fetch All'
    }

    export class ChangeTopic {
        static readonly type = '[Topic] Change Topic';
        constructor(public payload: TopicModel) {}
    }
}