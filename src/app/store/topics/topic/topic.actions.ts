import {Topic} from '../topics.model';

export class AddTopic {
    public static type = 'AddTopic';
    constructor(public readonly payload: Topic) {}
}

export class RemoveTopic {
    public static type = 'RemoveTopic';
    constructor(public readonly payload: number) {}
}