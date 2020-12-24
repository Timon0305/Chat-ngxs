import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext} from '@ngxs/store';
import {TopicActions} from './topic-actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {TopicModel} from './topic-model';
import {NavigationService} from '../../../@fuse/services/navigation.service';

export interface TopicStateModel {
    topicList: TopicModel[]
}
@State<TopicStateModel>({
    name: 'topicList',
    defaults: {
        topicList: []
    }
})

@Injectable()
export class TopicState implements NgxsOnInit {

    constructor(
        private _chatService: NavigationService
    ) {}

    ngxsOnInit(ctx) {
        ctx.dispatch(new TopicActions.FetchAllMessage())
            .subscribe(() => {})
    }

    @Action(TopicActions.ChangeTopic)
    add(
        ctx: StateContext<TopicStateModel>,
        {payload}: TopicActions.ChangeTopic
    ) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            topicList: [
                {
                    ...payload
                }
            ]
        });
        this._chatService.getChat(payload.id);
    }
}