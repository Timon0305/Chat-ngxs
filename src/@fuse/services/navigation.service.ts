import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import {Store} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {ChannelModel} from '../../app/store/channel/channel-model';

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements Resolve<any>
{
    channel : any;
    messages: any;
    topic: any;
    changeChannel: BehaviorSubject<any>;
    getActiveChannel: BehaviorSubject<any>;
    selectTopic: BehaviorSubject<any>;
    onTopicSelect: BehaviorSubject<any>;
    getActiveTopics: BehaviorSubject<any>;
    onChatSelected: BehaviorSubject<any>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;

    constructor(
        private _httpClient: HttpClient,
        private store: Store,
    )
    {
        this.changeChannel = new BehaviorSubject(null);
        this.getActiveChannel = new BehaviorSubject(null);
        this.selectTopic = new BehaviorSubject(null);
        this.onTopicSelect = new BehaviorSubject(null);
        this.onChatSelected = new BehaviorSubject(null);
        this.getActiveTopics = new BehaviorSubject(null);
        this.onContactSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
        this.onUserUpdated = new Subject();
        this.onLeftSidenavViewChanged = new Subject();
        this.onRightSidenavViewChanged = new Subject();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                // this.getChannels(),
                this.getTopic(),
                this.getMessages()
            ]).then(
                ([  topic, message]) => {
                    // this.channel = channel;
                    this.topic = topic;
                    this.messages = message;
                    resolve();
                },
                reject
            );
        });
    }

    // selectChannel(channelId): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.getChannels()
    //             .then((response: any) => {
    //                 resolve(response);
    //                 const channelItem = response.find((item) => {
    //                     return item.id === channelId
    //                 });
    //                 if (channelItem) {
    //                     this.changeChannel.next({...channelItem});
    //                     this.getActiveChannel.next({...channelItem});
    //                 }
    //                 this.getTopicByChannel(channelItem.id);
    //             }, reject);
    //     });
    // }

    getTopicByChannel(channelId) {
        this.getTopic().then(res => {
            let topicData = [];
            for (let item of res) {
                if (item.data.channelId === channelId) {
                    topicData.push(item);
                }
            }
            this.selectTopic.next(topicData)
        })
    }

    getChat(messageId)
    {
        this.getMessages().then(res => {
            let chatMessage = [];
            for (let item of res) {
                if (item.data.topicId === messageId) {

                    chatMessage.push(item)
                }
            }
            this.onChatSelected.next(chatMessage);
        });

        this.getTopic().then(res => {
            for (let item of res) {
                if (item.id === messageId) {
                    this.onTopicSelect.next(item);
                    this.getActiveTopics.next(item);
                }
            }
        })

    }

    // getChannels() : Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get<ChannelModel[]>('api/chat-channel')
    //             .subscribe((response: any) => {
    //                 resolve(response[0].rows)
    //             }, reject);
    //     })
    // }

    getTopic(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-topic')
                .subscribe((response: any) => {
                    resolve(response[0].rows);
                }, reject)
        })
    }
    getMessages(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-message')
                .subscribe((response: any) => {
                    resolve(response[0].rows)
                }, reject)
        })
    }

    updateDialog(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const newData = {
                id    : chatId,
                dialog: dialog
            };

            this._httpClient.post('api/chat-message/' + chatId, newData)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }
}
