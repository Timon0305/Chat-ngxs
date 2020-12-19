import {Action, Selector, State, StateContext, NgxsOnInit, NgxsAfterBootstrap} from '@ngxs/store';

import {AddTopic, RemoveTopic} from './topic.actions';

import {Injectable} from '@angular/core';
import {Topic} from '../topics.model';

@State<Topic[]>({
    name: 'topic',
    defaults: []
})

@Injectable()
export class TopicState implements NgxsOnInit, NgxsAfterBootstrap {
    @Selector()
    public static topic(state: Topic[]): Topic[] {
        return state.filter(s => s.indexOf('topic') > -1);
    }

    public ngxsOnInit({getState, setState}: StateContext<Topic[]>) {
        const state: Topic[] = getState();
        const payload : Topic = 'NgxsOnInit topic';
        if (!state.includes(payload)) {
            setState([...state, payload])
        }
    }

    public ngxsAfterBootstrap({getState, setState} : StateContext<Topic[]>): void {
        const state: Topic[] = getState();
        const payload: Topic = 'NgxsAfterBootStrap channel';
        if (!state.includes(payload)) {
            setState([...state, payload])
        }
    }

    @Action(AddTopic)
    public addTopic({setState}: StateContext<Topic[]>, {payload}: AddTopic) {
        setState(state => [...state, payload])
    }

    @Action(RemoveTopic)
    public removeTopic({setState} : StateContext<Topic[]>, {payload}: RemoveTopic) {
        setState(state => state.filter((_, i) => i !== payload))
    }
}