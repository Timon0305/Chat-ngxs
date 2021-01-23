import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext, Selector} from '@ngxs/store';
import {SelectMessage, AddMessage, FetchMessage} from './message.actions';
import {MessageModel} from './message.model';
import {MessageService} from './message.service';

export interface MessageStateModel {
    messageList: MessageModel[],
    selectedMessage: MessageModel[];
}
@State<MessageStateModel>({
    name: 'messageList',
    defaults: {
        messageList: [],
        selectedMessage: null
    }
})

@Injectable()
export class MessageState implements NgxsOnInit {

    constructor(
        private messageService: MessageService
    ) {}

    ngxsOnInit(ctx: StateContext<MessageStateModel>): void {
        ctx.dispatch(new FetchMessage);
    }

    @Selector()
    static getMessageList(state: MessageStateModel) {
        return state.messageList
    }

    @Selector()
    static getSelectedMessage(state: MessageStateModel) {
        return state.selectedMessage
    }

    @Action(FetchMessage)
    fetchMessage({getState, setState}: StateContext<MessageStateModel>) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.messageService.fetchMessage()
                .subscribe((response: object) => {
                    let res = response['rows'];
                    resolve(res);
                    setState({
                        ...state,
                        messageList: res
                    })
                }, reject)
        })
    }

    @Action(SelectMessage)
    selectMessage({getState, setState}: StateContext<MessageStateModel>, {payload}: SelectMessage) {
        let state = getState();
        let topicChat = [];
        for (let item of state.messageList) {
            if (item.data.topicId === payload.id) {
                topicChat.push(item)
            }
        }
        setState({
            ...state,
            selectedMessage: topicChat
        });

    }

    @Action(AddMessage)
    addMessage({getState, patchState}: StateContext<MessageStateModel>, {payload}: AddMessage) {
        let state = getState();
        patchState({
            selectedMessage: [...state.selectedMessage, payload]
        });
    }
}