import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import {NavigationService} from '../../../../../@fuse/services/navigation.service';
import {FetchAllMessage, AddMessage} from '../../../../store/message/message-actions';
import {MessageState} from '../../../../store/message/message-state';
import {MessageModel} from '../../../../store/message/message-model';


@Component({
    selector     : 'chat-view',
    templateUrl  : './chat-view.component.html',
    styleUrls    : ['./chat-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit
{
    user: any;
    dialog: any;
    contact: any;
    replyInput: any;
    selectedChat: any;
    selectedTopic: string;

    @Select(MessageState.getSelectedMessage) selectedMessage: Observable<MessageModel>;
    private messageSubscription : Subscription = new Subscription();

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _chatService: NavigationService,
        private store: Store
    )
    {
        this._unsubscribeAll = new Subject();
    }

     ngOnInit(): void
    {
        this.user = {id : 'f32dc9ae-7ca8-44ca-8f25-f258f7331c55'};
        this._chatService.onChatSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(chatData => {
                if ( chatData )
                {
                    this.selectedChat = chatData;
                    this.readyToReply();
                }
            });

        this._chatService.onTopicSelect
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(res => {
                if (res) {
                    this.selectedTopic = res.data.name;
                }
            })
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
            data: {text: ''},
            id: uuidv4(),
            system: {updatedAt: '', userId: this.user.id}
        };

        replyMessage.data.text = this.replyForm.form.value.message;
        replyMessage.system.updatedAt = new Date().toISOString();

        this.selectedChat.push(replyMessage);

        this.replyForm.reset();

        this.messageSubscription.add(
            this.store.dispatch(new AddMessage(this.user.id, this.selectedChat)).subscribe(() => {

            })
        )

        // this.store.dispatch(new AddMessage(this.user.id, this.selectedChat));

        // this._chatService.updateDialog(this.user.id, this.selectedChat).then(() => {
        //     this.readyToReply();
        // });
    }
}
