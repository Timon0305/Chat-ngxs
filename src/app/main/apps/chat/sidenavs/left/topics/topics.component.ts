import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Observable, Subject} from 'rxjs';
import {fuseAnimations} from '@fuse/animations';
import {FuseMatSidenavHelperService} from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {
    AddNewTopic,
    ChangeTopic,
    FetchTopic,
    SetTopicNotification, SetTopicStatus,
    UpdateTopic
} from '../../../../../../store/topic/topic.actions';
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
import {EditTopicComponent} from "../edit-topic/edit-topic.component";
import {TopicSettingComponent} from "../topic-setting/topic-setting.component";
import {TopicStatusComponent} from "../topic-status/topic-status.component";

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
    selectedTopic: TopicModel;
    private _unsubscribeAll: Subject<any>;
    @Select(ChannelState.getSelectedChannel) getSelectedChannel: Observable<ChannelModel>;
    @Select(TopicState.getTopicsList) getTopicsList: Observable<TopicModel>;
    @Select(TopicState.getSelectedTopic) getSelectedTopic: Observable<TopicModel>;
    @Select(TopicState.getTopicPage) getTopicPage: Observable<number>;
    @Select(TopicState.getTopicTotalPage) getTopicTotalPage: Observable<number>;
    channelId: string;
    dialogRef: any;
    pageNum: number ;
    totalNum: number;
    status: Boolean = false;
    constructor(
        private store: Store,
        private channelState : ChannelState,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _mediaObserver: MediaObserver,
        public _matDialog: MatDialog,
        private def: ChangeDetectorRef,
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

        this.getTopicsList
            .subscribe(res => {
                if (res) {
                    this.getTopics = res
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

        this.getSelectedTopic.subscribe(response => {
            if (response) {
                this.selectedTopic = response;
                for (let items of this.getTopics) {
                    if (items.id === response.id) {
                        items = Object.assign({active:true}, items);
                        this.def.detectChanges();
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


    getChat(data): void {
        this.store.dispatch(new ChangeTopic(data));
        this.store.dispatch(new FetchMessage(data.id));

        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

    addTopic = (data) => {
        this.dialogRef = this._matDialog.open(AddTopicComponent, {
            panelClass: 'mail-compose-dialog',
            disableClose: true,
            data: {
                topic: data
            }
        });
        this.topicAction()
    };

    editTopic = (data) => {
        let token = localStorage.getItem('userId');
        if (token === data['system']['userId']) {
            this.dialogRef = this._matDialog.open(EditTopicComponent, {
                panelClass: 'setting-dialog',
                disableClose: true,
                data: {
                    topic: data
                }
            });
            this.topicAction();
        }
        else {
            window.confirm('you are not admin')
        }
    };

    topicAction = () => {
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    case 'addTopic':
                        this.saveTopic(formData.getRawValue());
                        break;
                    case 'editTopic':
                        this.updateTopic(formData.getRawValue());
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

    updateTopic = (value) => {
        let topic = {
            id: this.selectedTopic.id,
            channelId: this.channelId,
            name: value['title'],
            description: value['description']
        };
        this.store.dispatch(new UpdateTopic(topic));
    };

    settingTopic = (topic) => {
        this.dialogRef = this._matDialog.open(TopicSettingComponent, {
            panelClass: 'setting-dialog',
            disableClose: true,
            data: {
                topic: topic
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    case 'setting' :
                        this.saveSetting(formData.getRawValue());
                        break;
                }
            })
    };

    saveSetting = (value) => {
        let notification = {
            notify: value.isCheck,
            topicId : this.selectedTopic.id
        };
        this.store.dispatch(new SetTopicNotification(notification))
    };

    topicState = () => {
        this.dialogRef = this._matDialog.open(TopicStatusComponent, {
            panelClass: 'setting-dialog',
            disableClose: true,
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                switch (actionType) {
                    case 'status' :
                        this.saveStatus();
                        break;
                }
            })
    };

    saveStatus = () => {
        let status = {
            topicId : this.selectedTopic.id,
            active: this.status
        };
        this.store.dispatch(new SetTopicStatus(status))
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

    moreTopic = (pNum) => {
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
