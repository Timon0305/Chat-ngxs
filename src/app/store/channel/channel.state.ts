import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {FetchAllChannel, ChangeChannel} from './channel.actions';
import {ChannelModel} from './channel.model';
import {TopicModel} from '../topic/topic.model';
import {ChannelService} from './channel.service';
import {TopicService} from '../topic/topic.service';

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
export class ChannelState implements NgxsOnInit
{
    constructor(
        private channelService: ChannelService,
        private topicService: TopicService
    ) {}

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

    ngxsOnInit(): void {
        this.channelService.fetchChannel()
            .subscribe(res => {

            })
    }


    @Action(FetchAllChannel)
    fetchAllChannel({getState, setState}: StateContext<ChannelStateModel>) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.channelService.fetchChannel()
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
        let state = getState();
        return new Promise((resolve, reject) => {
            this.channelService.fetchChannel()
                .subscribe((response: any) => {
                    let res = response[0].rows;
                    let channelItem = res.find((item) => {
                        return item.id === payload.id
                    });
                    this.topicService.fetchTopic()
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