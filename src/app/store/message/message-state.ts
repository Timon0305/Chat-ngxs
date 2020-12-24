import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext} from '@ngxs/store';
import {MessageActions} from './message-actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {MessageModel} from './message-model';
import {NavigationService} from '../../../@fuse/services/navigation.service';

export interface MessageStateModel {
    messageList: MessageModel[]
}
@State<MessageStateModel>({
    name: 'messageList',
    defaults: {
        messageList: []
    }
})

@Injectable()
export class MessageState implements NgxsOnInit{

    constructor(
        private _chatService: NavigationService
    ) {}

    ngxsOnInit(ctx) {
        ctx.dispatch(new MessageActions.FetchAllMessage())
            .subscribe(() => {})
    }

    @Action(MessageActions.AddMessage)
    add(
        ctx: StateContext<MessageStateModel>,
        {id,  payload } : MessageActions.AddMessage
    ) {
        console.log('get message', payload)
        const state = ctx.getState();
        ctx.setState({
            ...state,
            messageList: [
                {
                    ...payload
                }
            ]
        });
        console.log('payload', state)
    }
}