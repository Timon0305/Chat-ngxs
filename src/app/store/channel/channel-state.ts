import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext} from '@ngxs/store';
import {ChannelActions} from './channel-actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {ChannelModel} from './channel-model';
import {NavigationService} from '../../../@fuse/services/navigation.service';

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
        private _chatService: NavigationService
    ) {}

    ngxsOnInit(ctx) {
        ctx.dispatch(new ChannelActions.FetchAllChannel())
            .subscribe(res => {
                console.log(res)
            })
    }

    @Action(ChannelActions.ChangeChannel)
    add(
        ctx: StateContext<ChannelStateModel>,
        { payload } : ChannelActions.ChangeChannel
    ) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            channelList: [
                {
                    ...payload
                }
            ]
        });

        this._chatService.selectChannel(payload.id)
            .then(() => {})
    }
}