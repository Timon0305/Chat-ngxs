import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import {NavigationService} from '../../../../../../@fuse/services/navigation.service';

@Component({
    selector     : 'chat-right-sidenav',
    templateUrl  : './right.component.html',
    styleUrls    : ['./right.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChatRightSidenavComponent implements OnInit, OnDestroy
{
    view: string;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _chatService: NavigationService
    )
    {
        this.view = 'contact';

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this._chatService.onRightSidenavViewChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(view => {
                this.view = view;
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
