import {Injectable} from '@angular/core';
import {State,  Action, StateContext, Selector} from '@ngxs/store';
import {FetchAllChannel, ChangeChannel} from './channel-actions';
import {ChannelModel} from './channel-model';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TopicModel} from '../topic/topic-model';

export interface ChannelStateModel {
    channelList: ChannelModel[],
    selectedChannel: ChannelModel,
    getTopic: TopicModel[]
}
@State<ChannelStateModel>({
    name: 'channelList',
    defaults: {
        channelList: [],
        selectedChannel: null,
        getTopic: null
    }
})
@Injectable()
export class ChannelState
{
    constructor(private _httpClient: HttpClient) {}

    @Selector()
    static getChannelList(state: ChannelStateModel) {
        return state.channelList
    }

    @Selector()
    static getSelectedChannel(state: ChannelStateModel) {
        return state.selectedChannel
    }

    @Selector()
    static getTopicByChannel(state: ChannelStateModel) {
        return state.getTopic
    }


    @Action(FetchAllChannel)
    fetchAllChannel({getState, setState}: StateContext<ChannelStateModel>) {
        const state = getState();
        return new Promise((resolve, reject) => {
            this._httpClient.get<ChannelModel[]>('api/chat-channel')
                .subscribe((response: any) => {
                    let res = response[0].rows;
                    resolve(res);
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
                    let res = response[0].rows;
                    const channelItem = res.find((item) => {
                        return item.id === payload.id
                    });
                    this._httpClient.get('api/chat-topic')
                        .subscribe((response: any) => {
                            let res = response[0].rows;
                            let topicData = [];
                            for (let item of res) {
                                if (item.data.channelId === channelItem.id) {
                                    topicData.push(item);
                                }
                            }
                            setState({
                                ...state,
                                selectedChannel: channelItem,
                                getTopic: topicData
                            });
                            resolve(res);
                        }, reject);

                }, reject);

        })
    }
}