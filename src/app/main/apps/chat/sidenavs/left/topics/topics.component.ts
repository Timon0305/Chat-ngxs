import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Observable, Subject} from 'rxjs';
import {fuseAnimations} from '@fuse/animations';
import {FuseMatSidenavHelperService} from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {AddNewTopic, ChangeTopic, FetchTopic} from '../../../../../../store/topic/topic.actions';
import {Select, Store} from '@ngxs/store';
import {TopicModel} from '../../../../../../store/topic/topic.model';
import {ChannelState} from '../../../../../../store/channel/channel.state';
import {TopicState} from '../../../../../../store/topic/topic.state';
import {FetchMessage} from '../../../../../../store/message/message.actions';
import {ChannelModel} from '../../../../../../store/channel/channel.model';
import {AddTopicComponent} from "../add-topic/add-topic.component";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector     : 'topics-sidenav',
    templateUrl  : './topics.component.html',
    styleUrls    : ['./topics.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TopicsComponent implements OnInit, OnDestroy
{
    getTopics: any;
    private _unsubscribeAll: Subject<any>;
    @Select(ChannelState.getSelectedChannel) getSelectedChannel: Observable<ChannelModel>;
    @Select(TopicState.getSelectedTopic) getTopicByChannel: Observable<TopicModel>;
    @Select(TopicState.getTopicPage) getTopicPage: Observable<number>;
    @Select(TopicState.getTopicTotalPage) getTopicTotalPage: Observable<number>;
    @Select(TopicState.getActiveTopic) getActiveTopic: Observable<TopicModel>;
    channelId: string;
    dialogRef: any;
    pageNum: number ;
    totalNum: number;
    constructor(
        private store: Store,
        private channelState : ChannelState,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _mediaObserver: MediaObserver,
        public _matDialog: MatDialog
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.getSelectedChannel
            .subscribe(response => {
                if (response) {
                    this.channelId = response.id;
                   this.store.dispatch(new FetchTopic({
                       'channelId': response.id,
                       'pageNum': this.pageNum
                   }))
                       .subscribe(res => {
                           this.getTopics = res.topicList.topicList;
                       });
                } else {
                    this.getTopics = []
                }
            });

        this.getTopicPage
            .subscribe(res => {
                this.pageNum = res;
            });

        this.getTopicTotalPage
            .subscribe(res => {
                this.totalNum = res;
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
        this.store.dispatch(new FetchMessage(id));

        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

    addTopic = () => {
        this.dialogRef = this._matDialog.open(AddTopicComponent, {
            panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    case 'send':
                        this.saveTopic(formData.getRawValue());
                        break;
                    case 'delete':
                        console.log('delete Topic');
                        break;
                }
            })
    };

    saveTopic = (value) => {
        let topic = {
            id: uuidv4(),
            channelId: this.channelId,
            name: value['title'],
            description: value['description']
        };
        this.store.dispatch(new AddNewTopic(topic))
    };

    prePage = (pNum) => {
        if (pNum === 1) {
            return;
        } else {
            let pageNum = --this.pageNum;
            this.store.dispatch(new FetchTopic({
                'channelId': this.channelId,
                'pageNum': pageNum
            }))
        }
    };

    nextPage = (pNum) => {
        if (pNum === this.totalNum) {
            return;
        } else {
            let pageNum = ++this.pageNum;
            this.store.dispatch(new FetchTopic({
                'channelId': this.channelId,
                'pageNum': pageNum
            }))
        }
    }
}
