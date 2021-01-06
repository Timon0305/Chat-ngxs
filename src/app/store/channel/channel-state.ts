import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext, Select, Store, Selector} from '@ngxs/store';
import {FetchAllChannel, ChangeChannel} from './channel-actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {ChannelModel} from './channel-model';
import {NavigationService} from '../../../@fuse/services/navigation.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {channel} from '../../fake-db/chat-channel'
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

export interface ChannelStateModel {
    channelList: ChannelModel[],
    selectedChannel: ChannelModel
}
@State<ChannelStateModel>({
    name: 'channelList',
    defaults: {
        channelList: [],
        selectedChannel: null
    }
})
@Injectable()
export class ChannelState
{

    selectChannel: BehaviorSubject<any>;
    getActiveChannel: BehaviorSubject<any>;
    selectTopic: BehaviorSubject<any>;
    constructor(
        private _httpClient: HttpClient,
    ) {
        this.selectChannel = new BehaviorSubject(null);
        this.getActiveChannel = new BehaviorSubject(null);
        this.selectTopic = new BehaviorSubject(null);
    }

    @Selector()
    static getChannelList(state: ChannelStateModel) {
        return state.channelList
    }

    @Selector()
    static getSelectedChannel(state: ChannelStateModel) {
        return state.selectedChannel
    }


    @Action(FetchAllChannel)
    fetchAllChannel({getState, setState}: StateContext<ChannelStateModel>) {
        return new Promise((resolve, reject) => {
            this._httpClient.get<ChannelModel[]>('api/chat-channel')
                .subscribe((response: any) => {
                    let res = response[0].rows;
                    resolve(res);
                    const state = getState();
                    setState({
                        ...state,
                        channelList: res
                    })
                }, reject);
        });
    }

    @Action(ChangeChannel)
    changeChannel({getState, setState} : StateContext<ChannelStateModel>, {payload}: ChangeChannel) {
        const state = getState();
        return new Promise((resolve, reject) => {
            this._httpClient.get<ChannelModel[]>('api/chat-channel')
                .subscribe((response: any) => {
                    resolve(response[0].rows);
                    let res = response[0].rows;
                    const channelItem = res.find((item) => {
                        return item.id === payload.id
                    });
                    if (channelItem) {
                        this.selectChannel.next({...channelItem});
                        this.getActiveChannel.next({...channelItem});
                    }
                    setState({
                        ...state,
                        selectedChannel: channelItem
                    });
                    return new Promise((resolve, reject) => {
                        this._httpClient.get('api/chat-topic')
                            .subscribe((response: any) => {
                                let res = response[0].rows;
                                let topicData = [];
                                for (let item of res) {
                                    if (item.data.channelId === channelItem.id) {
                                        topicData.push(item);
                                    }
                                }
                                this.selectTopic.next(topicData)
                                resolve(res);
                            }, reject)

                    })

                }, reject);

        })
    }
}