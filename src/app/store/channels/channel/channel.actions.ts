import {Channel} from '../channels.model';

export class AddChannel {
    public static type = 'AddChannel';
    constructor(public readonly payload: Channel) {}
}

export class RemoveChannel {
    public static type = 'RemoveChannel';
    constructor(public readonly payload: number) {}
}