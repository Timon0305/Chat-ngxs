import {ChannelModel} from './channel.model';

export class FetchPageChannel {
    static readonly type = '[Channel] Fetch All';
    constructor(public payload: number) {}
}

export class ChangeChannel {
    static readonly type = '[Channel] Change Channel';
    constructor(public payload: ChannelModel) {}
}

export class AddNewChannel {
    static readonly type = '[Channel] Add New Channel';
    constructor(public payload: any) {}
}
