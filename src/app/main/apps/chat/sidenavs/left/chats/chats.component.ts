import {Component,  OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

import {NavigationService} from '../../../../../../../@fuse/services/navigation.service';
import {takeUntil} from 'rxjs/operators';
import {TopicActions} from '../../../../../../store/topic/topic-actions';
import {Store} from '@ngxs/store';


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
        private store: Store,
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
                } else {
                    this.getTopics = []
                }
            });

        this._chatService.getActiveTopics
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(res => {
                if (res) {
                    for (let item of this.getTopics) {
                        item.active = item.id === res.id;
                    }
                }
            })
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    getChat(id): void
    {
        // this.store.dispatch(new TopicActions.ChangeTopic({id: id}));
        this._chatService.getChat(id);

        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

}
