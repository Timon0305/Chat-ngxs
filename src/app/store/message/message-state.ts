import {Injectable} from '@angular/core';
import {State, NgxsOnInit, Action, StateContext, Store, Selector} from '@ngxs/store';
import {FetchAllMessage, AddMessage} from './message-actions';
import {patch, updateItem} from '@ngxs/store/operators';
import {MessageModel} from './message-model';
import {NavigationService} from '../../../@fuse/services/navigation.service';

export interface MessageStateModel {
    messageList: MessageModel[],
}
@State<MessageStateModel>({
    name: 'messageList',
    defaults: {
        messageList: [],
    }
})

@Injectable()
export class MessageState {

    constructor(
        private store: Store,
        private _chatService: NavigationService
    ) {}

    @Selector()
    static getMessageList(state: MessageStateModel) {
        return state.messageList
    }

    @Selector()
    static getSelectedMessage(state: MessageStateModel) {
        return state.messageList
    }

    @Action(FetchAllMessage)
    fetchAllMessage({getState, setState}: StateContext<MessageStateModel>) {
        return this._chatService.getMessages().then(result => {
            const state = getState();
            setState({
                ...state,
                messageList: result
            })
        })
    }

    @Action(AddMessage)
    addMessage({getState, patchState}: StateContext<MessageStateModel>, {id, payload}: AddMessage) {
        return this._chatService.updateDialog(id, payload).then((result) => {
            const state = getState();
            patchState({
                messageList: [...state.messageList, result]
            })
        })
    }
}