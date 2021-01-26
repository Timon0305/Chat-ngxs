import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import {AddNewTopic, ChangeTopic, FetchTopic} from './topic.actions';
import {TopicModel} from './topic.model';
import {TopicService} from './topic.service';

export interface TopicStateModel {
    topicList: TopicModel[];
    page: number,
    totalPages: number,
    selectedTopic: TopicModel,
}
@State<TopicStateModel>({
    name: 'topicList',
    defaults: {
        topicList: [],
        page: null,
        totalPages: null,
        selectedTopic: null,
    }
})
@Injectable()
export class TopicState {

    constructor(
        private store: Store,
        private topicService: TopicService,
    ) {}


    @Selector()
    static getSelectedTopic(state: TopicStateModel) {
        return state.topicList
    }

    @Selector()
    static getTopicPage(state: TopicStateModel) {
        return state.page
    }

    @Selector()
    static getTopicTotalPage(state: TopicStateModel) {
        return state.totalPages
    }

    @Selector()
    static getActiveTopic(state: TopicStateModel) {
        return state.selectedTopic
    }

    @Action(FetchTopic)
    fetchTopic({getState, setState}: StateContext<TopicStateModel>, {payload} : FetchTopic) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.topicService.fetchTopic(payload)
                .subscribe((response: object) => {
                    let res = response['rows'];
                    resolve(res);
                    setState({
                        ...state,
                        page: response['page'],
                        totalPages: response['totalPages'],
                        topicList: res
                    })
                }, reject);
        });
    }

    @Action(ChangeTopic)
    changeTopic({getState, setState}: StateContext<TopicStateModel>, {payload}: ChangeTopic) {
        let state = getState();
        setState({
            ...state,
            selectedTopic: payload,
        });
    }

    @Action(AddNewTopic)
    addNewTopic({getState, setState}: StateContext<TopicStateModel>, {payload}: AddNewTopic) {
        let state = getState();
        let channelId = payload.channelId;
        let pageNum = state.page;
        if (pageNum === state.totalPages) {
            return;
        } else {
            ++pageNum
        }
        this.topicService.addTopic(payload)
            .subscribe(() => {
                this.store.dispatch(new FetchTopic(channelId))
            })
    }
}