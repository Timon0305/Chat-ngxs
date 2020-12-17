import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

import { ChatService } from 'app/main/apps/chat/chat.service';

@Component({
    selector     : 'chat-chats-sidenav',
    templateUrl  : './chats.component.html',
    styleUrls    : ['./chats.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChatChatsSidenavComponent implements OnInit, OnDestroy
{
    chats: any[];
    chatSearch: any;
    contacts: any[];
    searchText: string;
    user: any;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _chatService: ChatService,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _mediaObserver: MediaObserver
    )
    {
        this.chatSearch = {
            name: ''
        };
        this.searchText = '';

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.user = this._chatService.user;
        this.chats = this._chatService.chats;
        this.contacts = this._chatService.contacts;

        this._chatService.onChatsUpdated
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(updatedChats => {
                this.chats = updatedChats;
            });

        this._chatService.onUserUpdated
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(updatedUser => {
                this.user = updatedUser;
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    getChat(contact): void
    {
        this._chatService.getChat(contact);

        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

    setUserStatus(status): void
    {
        this._chatService.setUserStatus(status);
    }

    changeLeftSidenavView(view): void
    {
        this._chatService.onLeftSidenavViewChanged.next(view);
    }

    logout(): void
    {
        console.log('logout triggered');
    }
}
