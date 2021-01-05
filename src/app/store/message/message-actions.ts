import {MessageModel} from './message-model';

export class FetchAllMessage {
    static readonly type = '[Message] Fetch All'
}

export class AddMessage {
    static readonly type = '[Message] Add Message';
    constructor(public id: string ,public payload: MessageModel) {}
}