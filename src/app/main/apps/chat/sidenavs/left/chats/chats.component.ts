import {Component,  OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {ChangeTopic, FetchTopic} from '../../../../../../store/topic/topic-actions';
import {Select, Store} from '@ngxs/store';
import {TopicModel} from '../../../../../../store/topic/topic-model';
import {ChannelState} from '../../../../../../store/channel/channel-state';
import {TopicState} from '../../../../../../store/topic/topic-state';
import {SelectMessage} from '../../../../../../store/message/message-actions';

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
    @Select(ChannelState.getTopicByChannel) getTopicByChannel: Observable<TopicModel>;
    @Select(TopicState.getActiveTopic) getActiveTopic: Observable<TopicModel>;

    constructor(
        private store: Store,
        private channelState : ChannelState,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _mediaObserver: MediaObserver
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.getTopicByChannel
            .subscribe(res => {
                if (res) {
                    this.getTopics = res;
                } else {
                    this.getTopics = []
                }
            });

        this.getActiveTopic.subscribe(response => {
            if (response) {
                for (let items of this.getTopics) {
                    if (items.id === response.id) {
                        items = Object.assign({active:true}, items);
                    }
                }
            }
        });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    getChat(id): void {
        this.store.dispatch(new ChangeTopic({id: id}));
        this.store.dispatch(new FetchTopic);
        this.store.dispatch(new SelectMessage({id: id}));

        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

}
