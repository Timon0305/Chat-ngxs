import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {ChangeTopic, FetchTopic} from './topic.actions';
import {TopicModel} from './topic.model';
import {TopicService} from './topic.service';

export interface TopicStateModel {
    topicList: TopicModel[];
    selectedTopic: TopicModel,
}
@State<TopicStateModel>({
    name: 'topicList',
    defaults: {
        topicList: [],
        selectedTopic: null,
    }
})
@Injectable()
export class TopicState implements NgxsOnInit {

    constructor(
        private topicService: TopicService,
    ) {}


    ngxsOnInit(ctx: StateContext<TopicStateModel>): void {
        ctx.dispatch(new FetchTopic)
    }

    @Selector()
    static getSelectedTopic(state: TopicStateModel) {
        return state.topicList
    }

    @Selector()
    static getActiveTopic(state: TopicStateModel) {
        return state.selectedTopic
    }

    @Action(FetchTopic)
    fetchTopic({getState, setState}: StateContext<TopicStateModel>) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.topicService.fetchTopic()
                .subscribe((response: object) => {
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
        setState({
            ...state,
            selectedTopic: payload,
        });
    }
}