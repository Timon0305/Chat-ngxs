import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';

import {tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {Injectable} from '@angular/core';

import {ChannelState} from './channel/channel.state';
import {ChannelInfo, ChannelStateModel} from './channels.model';
import {LoadData, SetPrefix} from './channels.actions';

const CHANNEL_TOKEN: StateToken<ChannelStateModel> = new StateToken('channels');

@State<ChannelStateModel>({
    name: CHANNEL_TOKEN,
    defaults: {
        channel: [],
        channelInfo: {}
    },
    children: [ChannelState]
})

@Injectable()
export class ChannelsState {
    @Selector()
    public static channelInfo(state: ChannelStateModel): ChannelInfo {
        return state.channelInfo
    }

    @Action(SetPrefix)
    public setPrefix({setState}: StateContext<ChannelStateModel>) {
        setState(
            patch({
                channelInfo: patch({
                    data: patch({
                        selectChannelInfo: (selectChannelInfo: any) => 'Channel Data' + selectChannelInfo
                    })
                })
            })
        )
    }

    @Action(LoadData)
    public loadData({patchState}: StateContext<ChannelStateModel>) {
        const data = {selectChannelInfo: 'channel', extra: [false, false, true]};
        return of(data).pipe(tap(values => patchState({channelInfo: {data: {...values}}})))
    }
}

