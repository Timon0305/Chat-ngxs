import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';


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
    )
    {
        this.view = 'contact';

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {

    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
