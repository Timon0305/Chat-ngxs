import {Action, Selector, State, StateContext, NgxsOnInit, NgxsAfterBootstrap} from '@ngxs/store';

import {AddMessage, RemoveMessage} from './message.actions';

import {Injectable} from '@angular/core';
import {Message} from '../messages.model';

@State<Message[]>({
    name: 'message',
    defaults: []
})

@Injectable()
export class MessageState implements NgxsOnInit, NgxsAfterBootstrap {
    @Selector()
    public static message(state: Message[]): Message[] {
        return state.filter(s => s.indexOf('message') > -1);
    }

    public ngxsOnInit({getState, setState}: StateContext<Message[]>) {
        const state: Message[] = getState();
        const payload: Message = 'NgxsOnInit message';
        if (!state.includes(payload)) {
            setState([...state, payload])
        }
    }

    public ngxsAfterBootstrap({getState, setState}: StateContext<Message[]>) : void {
        const state: Message[] = getState();
        const payload: Message = 'NgxsAfterBootstrap message';
        if (!state.includes(payload)) {
            setState([...state, payload])
        }
    }

    @Action(AddMessage)
    public addMessage({setState}: StateContext<Message[]>, {payload}: AddMessage) {
        setState(state => [...state, payload])
    }

    @Action(RemoveMessage)
    public removeChannel({setState}: StateContext<Message[]>, {payload}: RemoveMessage) {
        setState(state => state.filter((_, i) => i !== payload))
    }
}