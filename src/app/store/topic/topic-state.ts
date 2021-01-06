import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {ChangeTopic, FetchTopic} from './topic-actions';
import {TopicModel} from './topic-model';
import {NavigationService} from '../../../@fuse/services/navigation.service';
import {HttpClient} from '@angular/common/http';
import {MessageModel} from '../message/message-model';

export interface TopicStateModel {
    topicList: TopicModel[];
    selectedTopic: TopicModel,
    getMessageByTopic: MessageModel[]
}
@State<TopicStateModel>({
    name: 'topicList',
    defaults: {
        topicList: [],
        selectedTopic: null,
        getMessageByTopic: null
    }
})

@Injectable()
export class TopicState {

    constructor(
        private _chatService: NavigationService,
        private _httpClient: HttpClient,
    ) {}

    @Selector()
    static getSelectedTopic(state: TopicStateModel) {
        return state.topicList
    }

    @Selector()
    static getActiveTopic(state: TopicStateModel) {
        return state.selectedTopic
    }

    @Selector()
    static getMessageByTopic(state: TopicStateModel) {
        return state.getMessageByTopic
    }

    @Action(FetchTopic)
    fetchTopic({getState, setState}: StateContext<TopicStateModel>) {
        const state = getState();
        return new Promise((resolve, reject) => {
            this._httpClient.get<TopicModel[]>('api/chat-topic')
                .subscribe((response: any) => {
                    let res = response[0].rows;
                    resolve(res);
                    setState({
                        ...state,
                        topicList: res
                    })
                }, reject);
        });
    }

    @Action(ChangeTopic)
    changeTopic({getState, setState}: StateContext<TopicStateModel>, {payload}: ChangeTopic) {
        const state = getState();
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-message')
                .subscribe((response: any) => {
                    let res = response[0].rows;
                    let chatMessage = [];
                    for (let item of res) {
                        if (item.data.topicId === payload.id) {
                            chatMessage.push(item)
                        }
                    }

                    setState({
                        ...state,
                        selectedTopic: payload,
                        getMessageByTopic: chatMessage
                    });
                    resolve(res)
                }, reject)

        })




    }
}