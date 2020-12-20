import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

@Injectable({
    providedIn: 'root'
})
export class ChatService implements Resolve<any>
{

    contacts: any[];
    chats: any[];
    user: any;
    channel : any[];
    topic: any[];

    changeChannel: BehaviorSubject<any>;
    onChatSelected: BehaviorSubject<any>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;

    constructor(
        private _httpClient: HttpClient
    )
    {
        this.changeChannel = new BehaviorSubject(null);
        this.onChatSelected = new BehaviorSubject(null);
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
                this.getContacts(),
                this.getChats(),
                this.getUser(),
                this.getChannel(),
                this.getTopic()
            ]).then(
                ([contacts, chats, user, channel, topic]) => {
                    this.contacts = contacts;
                    this.chats = chats;
                    this.user = user;
                    this.channel = channel;
                    this.topic = topic;
                    resolve();
                },
                reject
            );
        });

    }

    selectChannel(channelId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-channel')
                .subscribe((response: any) => {
                    resolve(response[0].rows);
                    const channelItem = response[0].rows.find((item) => {
                        return item.id === channelId
                    });
                    if (channelItem) {
                        this.changeChannel.next({...channelItem})
                    }
                    this.getTopicByChannel(channelItem.id)
                }, reject);
        })
    }

    getTopicByChannel(channelId) {
        this.getTopic().then(res => {
            for (let item of res) {
                if (item.data.channelId === channelId) {
                }
            }
        })
    }

    getChat(contactId): Promise<any>
    {
        const chatItem = this.user.chatList.find((item) => {
            return item.contactId === contactId;
        });

        if ( !chatItem )
        {
            this.createNewChat(contactId).then((newChats) => {
                this.getChat(contactId);
            });
            return;
        }

        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-chats/' + chatItem.id)
                .subscribe((response: any) => {
                    const chat = response;

                    const chatContact = this.contacts.find((contact) => {
                        return contact.id === contactId;
                    });

                    const chatData = {
                        chatId : chat.id,
                        dialog : chat.dialog,
                        contact: chatContact
                    };

                    this.onChatSelected.next({...chatData});

                }, reject);

        });

    }

    createNewChat(contactId): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const contact = this.contacts.find((item) => {
                return item.id === contactId;
            });

            const chatId = FuseUtils.generateGUID();

            const chat = {
                id    : chatId,
                dialog: []
            };

            const chatListItem = {
                contactId      : contactId,
                id             : chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                name           : contact.name,
                unread         : null
            };

            this.user.chatList.push(chatListItem);

            this._httpClient.post('api/chat-chats', {...chat})
                .subscribe((response: any) => {

                    this._httpClient.post('api/chat-user/' + this.user.id, this.user)
                        .subscribe(newUserData => {

                            this.getUser().then(updatedUser => {
                                this.onUserUpdated.next(updatedUser);
                                resolve(updatedUser);
                            });
                        });
                }, reject);
        });
    }

    selectContact(contact): void
    {
        this.onContactSelected.next(contact);
    }

    setUserStatus(status): void
    {
        this.user.status = status;
    }

    updateUserData(userData): void
    {
        this._httpClient.post('api/chat-user/' + this.user.id, userData)
            .subscribe((response: any) => {
                    this.user = userData;
                }
            );
    }

    updateDialog(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const newData = {
                id    : chatId,
                dialog: dialog
            };

            this._httpClient.post('api/chat-chats/' + chatId, newData)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-contacts')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getChats(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-chats')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-user')
                .subscribe((response: any) => {
                    resolve(response[0]);
                }, reject);
        });
    }

    getChannel() : Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-channel')
                .subscribe((response: any) => {
                    resolve(response[0].rows);
                    this.changeChannel.next(response[0].rows[0])
                }, reject);
        })
    }
    getTopic(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-topic')
                .subscribe((response: any) => {
                    resolve(response[0].rows);
                }, reject)
        })
    }
}
