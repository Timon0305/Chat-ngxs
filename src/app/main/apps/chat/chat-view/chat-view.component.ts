import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import {NavigationService} from '../../../../../@fuse/services/navigation.service';

@Component({
    selector     : 'chat-view',
    templateUrl  : './chat-view.component.html',
    styleUrls    : ['./chat-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit
{
    user: any;
    chat: any;
    dialog: any;
    contact: any;
    replyInput: any;
    selectedChat: any;

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _chatService: NavigationService
    )
    {
        this._unsubscribeAll = new Subject();
    }

     ngOnInit(): void
    {
        this._chatService.onChatSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(chatData => {
                if ( chatData )
                {
                    this.selectedChat = chatData;
                    this.readyToReply();
                }
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


    shouldShowContactAvatar(message, i): boolean
    {
        return (
            message.who === this.contact.id &&
            ((this.dialog[i + 1] && this.dialog[i + 1].who !== this.contact.id) || !this.dialog[i + 1])
        );
    }

    isFirstMessageOfGroup(message, i): boolean
    {
        return (i === 0 || this.dialog[i - 1] && this.dialog[i - 1].who !== message.who);
    }

    isLastMessageOfGroup(message, i): boolean
    {
        return (i === this.dialog.length - 1 || this.dialog[i + 1] && this.dialog[i + 1].who !== message.who);
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

        const message = {
            who    : this.selectedChat[0].id,
            message: this.replyForm.form.value.message,
            time   : new Date().toISOString()
        };

        console.log(this.dialog)
        this.dialog.push(message);
        //
        // this.replyForm.reset();

        // this._chatService.updateDialog(this.selectedChat.chatId, this.dialog).then(response => {
        //     this.readyToReply();
        // });
    }
}
