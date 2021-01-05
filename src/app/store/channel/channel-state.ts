import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext, Select, Store, Selector} from '@ngxs/store';
import {FetchAllChannel, ChangeChannel} from './channel-actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {ChannelModel} from './channel-model';
import {NavigationService} from '../../../@fuse/services/navigation.service';
import {Observable} from 'rxjs';
import {channel} from '../../fake-db/chat-channel'
import {tap} from 'rxjs/operators';

export interface ChannelStateModel {
    channelList: ChannelModel[]
}
@State<ChannelStateModel>({
    name: 'channelList',
    defaults: {
        channelList: []
    }
})
@Injectable()
export class ChannelState implements NgxsOnInit{

    constructor(
        private store: Store,
        private _chatService: NavigationService
    ) {}

    @Selector()
    static getChannelList(state: ChannelStateModel) {
        return state.channelList
    }

    ngxsOnInit() {

    }

    @Action(FetchAllChannel)
    fetchAllChannel({getState, setState}: StateContext<ChannelStateModel>) {
        return this._chatService.getChannels().then(result => {
            const state = getState();
            setState({
                ...state,
                channelList: result
            })
        })
    }
}