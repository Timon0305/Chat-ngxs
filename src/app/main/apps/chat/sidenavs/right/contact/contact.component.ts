import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {NavigationService} from '../../../../../../../@fuse/services/navigation.service';

@Component({
    selector     : 'chat-contact-sidenav',
    templateUrl  : './contact.component.html',
    styleUrls    : ['./contact.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatContactSidenavComponent implements OnInit, OnDestroy
{
    contact: any;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _chatService: NavigationService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this._chatService.onContactSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contact => {
                this.contact = contact;
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
