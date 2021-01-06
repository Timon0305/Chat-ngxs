import {Component,  OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {Observable, Subject, Subscription} from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

import {NavigationService} from '../../../../../../../@fuse/services/navigation.service';
import {takeUntil} from 'rxjs/operators';
import {FetchAllTopic, ChangeTopic} from '../../../../../../store/topic/topic-actions';
import {Select, Store} from '@ngxs/store';
import {TopicState} from '../../../../../../store/topic/topic-state';
import {TopicModel} from '../../../../../../store/topic/topic-model';
import {ChannelState} from '../../../../../../store/channel/channel-state';


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
    @Select(TopicState.getSelectedTopic) selectedTopic: Observable<TopicModel>;
    private topicSubscription: Subscription = new Subscription();

    constructor(
        private store: Store,
        private _chatService: NavigationService,
        private channelState : ChannelState,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _mediaObserver: MediaObserver
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.channelState.selectTopic
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
        this.topicSubscription.add(
            this.store.dispatch(new ChangeTopic({id: id})).subscribe((res) => {

            })
        );
        this._chatService.getChat(id);
        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

}
