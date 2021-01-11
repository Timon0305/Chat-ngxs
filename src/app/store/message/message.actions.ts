import {MessageModel} from './message.model';

export class FetchMessage {
    static readonly type = '[Message] Fetch Message'
}

export class SelectMessage {
    static readonly type = '[Message] Select Message';
    constructor(public payload: MessageModel) {}
}

export class AddMessage {
    static readonly type = '[Message] Add Message';
    constructor(public payload: any) {}
}
