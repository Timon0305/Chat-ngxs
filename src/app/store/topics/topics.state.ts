import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';

import {tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

import {TopicState} from './topic/topic.state';
import {TopicInfo, TopicStateModel} from './topics.model';
import {LoadData, SetPrefix} from './topics.actions';

const TOPIC_TOKEN: StateToken<TopicStateModel> = new StateToken('topics');

@State<TopicStateModel>({
    name: TOPIC_TOKEN,
    defaults: {
        topic: [],
        topicInfo: {}
    },
    children: [TopicState]
})

@Injectable()
export class TopicsState {
    @Selector()
    public static topicInfo(state: TopicStateModel): TopicInfo {
        return state.topicInfo
    }

    @Action(SetPrefix)
    public setPrefix({setState}: StateContext<TopicStateModel>) {
        setState(
            patch({
                topicInfo: patch({
                    data: patch({
                        selectedTopicInfo: (selectedTopicInfo: any) => 'Topic data.' + selectedTopicInfo
                    })
                })
            })
        )
    }

    @Action(LoadData)
    public loadData({patchState}: StateContext<TopicStateModel>) {
        const data = {selectedTopicInfo: 'topic', extra: [false, false, true]};
        return of(data).pipe(tap(values => patchState({topicInfo: {data: {...values}}})))
    }
}