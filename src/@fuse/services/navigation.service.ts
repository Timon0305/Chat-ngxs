import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
            Promise.all([]).then(
                ([]) => {
                    resolve();
                },
                reject
            );
        });
    }
}
