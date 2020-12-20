import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

import { ChatService } from 'app/main/apps/chat/chat.service';
import {NavigationService} from '../../../../../../../@fuse/services/navigation.service';
import {takeUntil} from 'rxjs/operators';


@Component({
    selector     : 'chat-chats-sidenav',
    templateUrl  : './chats.component.html',
    styleUrls    : ['./chats.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChatChatsSidenavComponent implements OnInit, OnDestroy
{

    getTopics: any;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _chatService: NavigationService,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _mediaObserver: MediaObserver
    )
    {

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this._chatService.selectTopic
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(res => {
                if (res) {
                    this.getTopics = res;
                }
            });
    }

    ngOnDestroy(): void
    {
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

}
