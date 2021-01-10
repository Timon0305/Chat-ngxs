import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {ChangeTopic, FetchTopic} from './topic.actions';
import {TopicModel} from './topic.model';
import {HttpClient} from '@angular/common/http';
import {MessageModel} from '../message/message.model';
import {TopicService} from './topic.service';
import {MessageService} from '../message/message.service';

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
export class TopicState implements NgxsOnInit {

    constructor(
        private topicService: TopicService,
        private messageService: MessageService
    ) {}


    ngxsOnInit(): void {
        this.topicService.fetchTopic()
            .subscribe(res => {

            })
    }

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
        let state = getState();
        return new Promise((resolve, reject) => {
            this.topicService.fetchTopic()
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
        let state = getState();
        return new Promise((resolve, reject) => {
            this.messageService.fetchMessage()
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