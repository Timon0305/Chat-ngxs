import {
    AfterViewInit, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { fuseAnimations } from '@fuse/animations';

import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {MessageModel} from '../../../../store/message/message.model';
import {TopicState} from '../../../../store/topic/topic.state';
import {TopicModel} from '../../../../store/topic/topic.model';
import {AddMessage} from '../../../../store/message/message.actions';
import {MessageState} from '../../../../store/message/message.state';
import {ChannelModel} from "../../../../store/channel/channel.model";

@Component({
    selector     : 'chat-view',
    templateUrl  : './chat-view.component.html',
    styleUrls    : ['./chat-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit
{
    user = localStorage.getItem('userId');
    dialog: any;
    contact: any;
    replyInput: any;
    topic: TopicModel;
    selectedChat: any;

    @Select(TopicState.getSelectedTopic) selectedTopic: Observable<TopicModel>;
    @Select(MessageState.getMessageList) getMessage: Observable<MessageModel>;

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;
    compId: string;
    myMessageNum: number;
    increaseNum : number = 0;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private store: Store,
        private def: ChangeDetectorRef,
    ) {
        this._unsubscribeAll = new Subject();
    }

     ngOnInit(): void
    {
        this.selectedTopic
            .subscribe(data => {
                this.topic = data
            });

        this.getMessage
            .subscribe(async chatData => {
                if ( chatData )
                {
                    this.selectedChat = chatData;
                    this.readyToReply();
                }
                let data = [];
                for (let item in chatData) {
                    if (chatData[item].system.userId !== localStorage.getItem('userId')) {
                        this.compId = chatData[item].system.userId;
                    }
                    await data.push(chatData[item]);
                }
                this.myMessageNum = data.length - 1;
                ++this.increaseNum;
                this.def.detectChanges();
            });
    }

    ngAfterViewInit(): void
    {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
    }


    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    readyToReply(): void
    {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    focusReplyInput(): void
    {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    scrollToBottom(speed?: number): void
    {
        speed = speed || 400;
        if ( this.directiveScroll )
        {
            this.directiveScroll.update();

            setTimeout(() => {
                this.directiveScroll.scrollToBottom(0, speed);
            });
        }
    }

    reply(event): void
    {
        event.preventDefault();

        if ( !this.replyForm.form.value.message )
        {
            return;
        }
        let replyMessage = {
            id: uuidv4(),
            channelId: this.topic.data.channelId,
            topicId: this.topic.id,
            text: this.replyForm.form.value.message
        };

        this.store.dispatch(new AddMessage(replyMessage));
        this.replyForm.reset();
    }
}
