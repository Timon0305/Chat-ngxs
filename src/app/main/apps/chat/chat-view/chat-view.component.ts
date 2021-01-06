import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {MessageModel} from '../../../../store/message/message-model';
import {TopicState} from '../../../../store/topic/topic-state';
import {TopicModel} from '../../../../store/topic/topic-model';
import {AddMessage} from '../../../../store/message/message-actions';


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
    topicId: string;

    @Select(TopicState.getMessageByTopic) getMessage: Observable<MessageModel>;
    @Select(TopicState.getSelectedTopic) getSelectedTopic: Observable<TopicModel>;
    @Select(TopicState.getActiveTopic) getActiveTopic: Observable<TopicModel>;

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private store: Store
    ) {
        this._unsubscribeAll = new Subject();
    }

     ngOnInit(): void
    {
        this.user = {id : 'f32dc9ae-7ca8-44ca-8f25-f258f7331c55'};
        this.getMessage
            .subscribe(chatData => {
                if ( chatData )
                {
                    this.selectedChat = chatData;
                    this.readyToReply();
                }
            });

        this.getActiveTopic.subscribe(response => {
            this.topicId = response.id;
            this.getSelectedTopic
                .subscribe((res) => {
                    for (let item in res) {
                        if (res[item].id === response.id) {
                            this.selectedTopic = res[item].data.name;
                        }
                    }
                })
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
            data: {
                text: '',
                topicId: this.topicId,
                stats: {
                    isRead: false,
                }
            },
            id: uuidv4(),
            system: {
                createdAt: '',
                updatedAt: '',
                spaceId: uuidv4(),
                model: 0,
                userId: this.user.id
            }
        };

        replyMessage.data.text = this.replyForm.form.value.message;
        replyMessage.system.updatedAt = new Date().toISOString();
        replyMessage.system.createdAt = new Date().toISOString();

        this.store.dispatch(new AddMessage(replyMessage)).subscribe(res => {
            this.selectedChat = res.messageList.selectedMessage;
        });

        this.replyForm.reset();

        // this.store.dispatch(new UpdateMessage(this.user.id, this.selectedChat)).subscribe(() => {
        //     this.readyToReply()
        // })
    }
}
