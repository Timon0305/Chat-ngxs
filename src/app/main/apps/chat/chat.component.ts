import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import {Select} from '@ngxs/store';
import {TopicState} from '../../../store/topic/topic.state';
import {MessageModel} from '../../../store/message/message.model';

@Component({
    selector     : 'chat',
    templateUrl  : './chat.component.html',
    styleUrls    : ['./chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChatComponent implements OnInit, OnDestroy
{
    selectedChat: any;
    private _unsubscribeAll: Subject<any>;
    @Select(TopicState.getMessageByTopic) getMessage: Observable<MessageModel>;

    constructor() {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
       this.getMessage
            .subscribe(chatData => {
                this.selectedChat = chatData;
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
