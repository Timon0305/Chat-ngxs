import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector, NgxsOnInit, Store} from '@ngxs/store';
import {FetchAllChannel, ChangeChannel, AddNewChannel, SubscribedChannel} from './channel.actions';
import {ChannelModel} from './channel.model';
import {ChannelService} from './channel.service';

export interface ChannelStateModel {
    channelList: ChannelModel[],
    subscribedChannel: ChannelModel[],
    selectedChannel: ChannelModel,
}
@State<ChannelStateModel>({
    name: 'channelList',
    defaults: {
        channelList: [],
        subscribedChannel: null,
        selectedChannel: null,
    }
})
@Injectable()
export class ChannelState implements NgxsOnInit
{
    constructor(
        private store: Store,
        private channelService: ChannelService,
    ) {}

    @Selector()
    static getChannelList(state: ChannelStateModel) {
        return state.channelList
    }

    @Selector()
    static getSelectedChannel(state: ChannelStateModel) {
        return state.selectedChannel
    }

    ngxsOnInit(ctx: StateContext<ChannelStateModel>) {
        ctx.dispatch(new FetchAllChannel())
    }

    @Action(FetchAllChannel)
    fetchAllChannel({getState, setState}: StateContext<ChannelStateModel>) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.channelService.fetchChannel()
                .subscribe((response: any) => {
                    let res = response['rows'];
                    setState({
                        ...state,
                        channelList: res
                    });
                    resolve(res);
                }, reject);
        });
    }

    @Action(SubscribedChannel)
    subscribedChannel({getState, setState} : StateContext<ChannelStateModel>) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.channelService.subscribedChannel()
                .subscribe((response: any) => {
                    let res = response['rows'];
                    setState({
                        ...state,
                        subscribedChannel: res
                    });
                    resolve(res);
                }, reject)
        })
    }

    @Action(ChangeChannel)
    changeChannel({getState, setState} : StateContext<ChannelStateModel>, {payload}: ChangeChannel) {
        let state = getState();

        let channelItem = state.channelList.find((item) => {
            return item.id === payload.id
        });
        setState({
            ...state,
            selectedChannel: channelItem,
        });
    }

    @Action(AddNewChannel)
    addNewChannel({getState, patchState}: StateContext<ChannelStateModel>, {payload} : AddNewChannel) {
        this.channelService.addChannel(payload)
            .subscribe(() => {
                this.store.dispatch(new FetchAllChannel())
            })
    }
}