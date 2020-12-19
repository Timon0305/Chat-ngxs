import {Message} from '../messages.model';

export class AddMessage {
    public static type = 'AddMessage';
    constructor(public readonly payload: Message) {}
}

export class RemoveMessage {
    public static type = 'RemoveMessage';
    constructor(public readonly payload: number) {}
}