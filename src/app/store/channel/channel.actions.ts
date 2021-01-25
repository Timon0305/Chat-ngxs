import {ChannelModel} from './channel.model';

export class FetchAllChannel {
    static readonly type = '[Channel] Fetch All';
}

export class SubscribedChannel {
    static readonly type = '[Channel] Subscribed Channel'
}

export class ChangeChannel {
    static readonly type = '[Channel] Change Channel';
    constructor(public payload: ChannelModel) {}
}

export class AddNewChannel {
    static readonly type = '[Channel] Add New Channel';
    constructor(public payload: any) {}
}
