import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext, Selector} from '@ngxs/store';
import {SelectMessage, AddMessage} from './message.actions';
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

    ngxsOnInit({getState, setState}): void {
        const state = getState();
        this.messageService.fetchMessage()
            .subscribe((res: object) => {
                setState({
                    ...state,
                    messageList: res[0].rows
                })
            })
    }

    @Selector()
    static getMessageList(state: MessageStateModel) {
        return state.messageList
    }

    @Selector()
    static getSelectedMessage(state: MessageStateModel) {
        return state.selectedMessage
    }

    @Action(SelectMessage)
    selectMessage({getState, setState}: StateContext<MessageStateModel>, {payload}: any) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.messageService.fetchMessage()
                .subscribe((response: object) => {
                    let res = response[0].rows;
                    resolve(res);
                    let topicChat = [];
                    for (let item of res) {
                        if (item.data.topicId === payload.id) {
                            topicChat.push(item)
                        }
                    }
                    setState({
                        ...state,
                        selectedMessage: topicChat
                    });
                }, reject);
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