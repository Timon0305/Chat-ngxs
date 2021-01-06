import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext, Selector} from '@ngxs/store';
import {ChangeTopic, FetchAllTopic} from './topic-actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {TopicModel} from './topic-model';
import {NavigationService} from '../../../@fuse/services/navigation.service';

export interface TopicStateModel {
    topicList: TopicModel[];
    selectedTopic: TopicModel
}
@State<TopicStateModel>({
    name: 'topicList',
    defaults: {
        topicList: [],
        selectedTopic: null
    }
})

@Injectable()
export class TopicState  {

    constructor(
        private _chatService: NavigationService
    ) {}

    @Selector()
    static fetchTopicList(state: TopicStateModel) {
        return state.topicList
    }

    @Selector()
    static getSelectedTopic(state: TopicStateModel) {
        return state.topicList
    }

    @Action(FetchAllTopic)
    fetchAllTopic({getState, setState}: StateContext<TopicStateModel>) {
        return this._chatService.getTopic().then((result) => {
            const state = getState();
            setState({
                ...state,
                topicList: result
            });
        });
    }

    @Action(ChangeTopic)
    changeTopic({getState, setState}: StateContext<TopicStateModel>, {payload}: ChangeTopic) {
        const state = getState();
        setState({
            ...state,
            selectedTopic: payload
        });

        return this._chatService.getChat(payload.id)
    }
}