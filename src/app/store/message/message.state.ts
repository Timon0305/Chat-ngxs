import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import {AddMessage, FetchMessage} from './message.actions';
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
export class MessageState {

    constructor(
        private store: Store,
        private messageService: MessageService
    ) {}


    @Selector()
    static getMessageList(state: MessageStateModel) {
        return state.messageList
    }

    @Selector()
    static getSelectedMessage(state: MessageStateModel) {
        return state.selectedMessage
    }

    @Action(FetchMessage)
    fetchMessage({getState, setState}: StateContext<MessageStateModel>, {payload}: FetchMessage) {
        let state = getState();
        return new Promise((resolve, reject) => {
            this.messageService.fetchMessage(payload)
                .subscribe((response: object) => {
                    let res = response['rows'];
                    res.sort((a, b) => {
                        return b['system']['updatedAt'] > a['system']['updatedAt'] ? -1: 1;
                    });
                    resolve(res);
                    setState({
                        ...state,
                        messageList: res
                    })
                }, reject)
        })
    }

    @Action(AddMessage)
    addMessage({getState, setState}: StateContext<MessageStateModel>, {payload}: AddMessage) {
        let topicId = payload.topicId;
        return new Promise((resolve, reject) => {
            this.messageService.addNewMessage(payload)
                .subscribe(() => {
                    this.store.dispatch(new FetchMessage(topicId));
                    resolve();
                }, reject)
        })
    }
}