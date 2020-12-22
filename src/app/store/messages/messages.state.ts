import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';

import {tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {Injectable} from '@angular/core';

import {MessageState} from './message/message.state';
import {MessageInfo, MessageStateModel} from './messages.model';
import {LoadData, SetPrefix} from '../channels/channels.actions';

const MESSAGE_TOKEN: StateToken<MessageStateModel> = new StateToken('messages');

@State<MessageStateModel>({
    name: MESSAGE_TOKEN,
    defaults: {
        message: [],
        messageInfo: {}
    },
    children: [MessageState]
})

@Injectable()
export class MessagesState {
    @Selector()
    public static messageInfo(state: MessageStateModel): MessageInfo {
        return state.messageInfo
    }

    @Action(SetPrefix)
    public setPrefix({setState}: StateContext<MessageStateModel>) {
        setState(
            patch({
                messageInfo: patch({
                    data: patch({
                        selectedMessageInfo: (selectedMessageInfo: any) => 'Message Data' + selectedMessageInfo
                    })
                })
            })
        )
    }

    @Action(LoadData)
    public loadData({patchState}: StateContext<MessageStateModel>) {
        const data = {selectedMessageInfo: 'message', extra: [false, false, true]};
        return of(data).pipe(tap(values => patchState({messageInfo: {data: {...values}}})))
    }
}