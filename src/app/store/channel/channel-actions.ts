import {ChannelModel} from './channel-model';

export namespace ChannelActions {
    export class FetchAllChannel {
        static readonly type = '[Channel] Fetch All';
    }

    export class ChangeChannel {
        static readonly type = '[Channel] Change Channel';
        constructor(public payload: ChannelModel) {}
    }
}