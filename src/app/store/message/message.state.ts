import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext, Store, Selector} from '@ngxs/store';
import {SelectMessage, AddMessage, UpdateMessage} from './message.actions';
import {MessageModel} from './message.model';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

export interface MessageStateModel {
    messageList: MessageModel[],
    selectedMessage: any[]
}
@State<MessageStateModel>({
    name: 'messageList',
    defaults: {
        messageList: [],
        selectedMessage: null
    }
})

@Injectable()
export class MessageState {

    constructor(
        private messageService: MessageService
    ) {}

    @Selector()
    static getMessageList(state: MessageStateModel) {
        return state.messageList
    }

    @Selector()
    static getSelectedMessage(state: MessageStateModel) {
        return state.messageList
    }

    @Action(SelectMessage)
    selectMessage({getState, setState}: StateContext<MessageStateModel>, {payload}: any) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.messageService.fetchMessage()
                .subscribe((response: any) => {
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