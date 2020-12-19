import {Action, Selector, State, StateContext, NgxsOnInit, NgxsAfterBootstrap} from '@ngxs/store';

import {AddChannel, RemoveChannel} from './channel.actions';

import {Injectable} from '@angular/core';
import {Channel} from '../channels.model';

@State<Channel[]>({
    name: 'channel',
    defaults: []
})
@Injectable()
export class ChannelState implements NgxsOnInit, NgxsAfterBootstrap {
    @Selector()
    public static channel(state: Channel[]): Channel[] {
        return state.filter(s => s.indexOf('channel') > -1);
    }

    public ngxsOnInit({getState, setState}: StateContext<Channel[]>) {
        const state: Channel[] = getState();
        const payload : Channel = 'NgxsOnInit channel';
        if (!state.includes(payload)) {
            setState([...state, payload])
        }
    }

    public ngxsAfterBootstrap({getState, setState} : StateContext<Channel[]>) : void {
        const state: Channel[] = getState();
        const payload: Channel = 'NgxsAfterBootStrap channel';
        if (!state.includes(payload)) {
            setState([...state, payload])
        }
    }

    @Action(AddChannel)
    public addChannel({setState} : StateContext<Channel[]>, {payload}: AddChannel) {
        setState(state => [...state, payload])
    }

    @Action(RemoveChannel)
    public removeChannel({setState} : StateContext<Channel[]>, {payload}: RemoveChannel) {
        setState(state => state.filter((_, i) => i !== payload))
    }
}