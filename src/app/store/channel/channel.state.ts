import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector, NgxsOnInit, Store} from '@ngxs/store';
import {
    ChangeChannel,
    AddNewChannel,
    FetchPageChannel,
    SetNotification,
    UpdateChannel,
    SetChannelStatus
} from './channel.actions';
import {ChannelModel} from './channel.model';
import {ChannelService} from './channel.service';

export interface ChannelStateModel {
    channelList: ChannelModel[],
    page: number,
    totalPages: number,
    selectedChannel: ChannelModel,
}
@State<ChannelStateModel>({
    name: 'channelList',
    defaults: {
        channelList: [],
        page: null,
        totalPages: null,
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
    static getChannelPage(state: ChannelStateModel) {
        return state.page
    }

    @Selector()
    static getChannelTotalPage(state: ChannelStateModel) {
        return state.totalPages
    }

    @Selector()
    static getSelectedChannel(state: ChannelStateModel) {
        return state.selectedChannel
    }

    ngxsOnInit(ctx: StateContext<ChannelStateModel>) {
        ctx.dispatch(new FetchPageChannel(1))
    }

    @Action(FetchPageChannel)
    fetchPageChannel({getState, setState}: StateContext<ChannelStateModel>, {payload} : FetchPageChannel) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.channelService.fetchChannel(payload)
                .subscribe((response: any) => {
                    let res = response['rows'];
                    setState({
                        ...state,
                        channelList: res,
                        page: response.page,
                        totalPages: response.totalPages,
                    });
                    resolve(res);
                }, reject);
        });
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
    addNewChannel({getState, setState}: StateContext<ChannelStateModel>, {payload} : AddNewChannel) {
        let state = getState();
        let pageNum = state.page;
        if (pageNum === state.totalPages) {

        } else {
            ++pageNum
        }
        this.channelService.addChannel(payload)
            .subscribe(() => {
                this.store.dispatch(new FetchPageChannel(pageNum))
            })
    }

    @Action(UpdateChannel)
    updateChannel({getState, setState}: StateContext<ChannelStateModel>, {payload}: UpdateChannel) {
        let state = getState();
        let pageNum = state.page;
        this.channelService.updateChannel(payload)
            .subscribe(() => {
                this.store.dispatch(new FetchPageChannel(pageNum))
            })
    }

    @Action(SetNotification)
    setNotification({getState, setState}: StateContext<ChannelStateModel>, {payload}: SetNotification) {
        return new Promise((resolve, reject) => {
            this.channelService.setNotify(payload)
                .subscribe(() => {
                    resolve()
                }, reject)
        })
    }

    @Action(SetChannelStatus)
    setChannelStatus({getStatus, setStatus}: StateContext<ChannelStateModel>, {payload}: SetChannelStatus) {
        return new Promise((resolve, reject) => {
            this.channelService.setStatus(payload)
                .subscribe(() => {
                    resolve()
                }, reject)
        })
    }
}