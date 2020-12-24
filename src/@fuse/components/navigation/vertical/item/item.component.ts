import {
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

import { FuseNavigationItem } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import {NavigationService} from '../../../../services/navigation.service';
import {Select, Store} from '@ngxs/store';
import {ChannelActions} from '../../../../../app/store/channel/channel-actions';


@Component({
    selector   : 'fuse-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class FuseNavVerticalItemComponent implements OnInit, OnDestroy
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: FuseNavigationItem;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */

    /**
     *
     * @param store
     * @param _chatService
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private store: Store,
        private _chatService: NavigationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }


    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {

             // Mark for check
             this._changeDetectorRef.markForCheck();
         });
    }


    clickChannel(channelId): void {
        // this.store.dispatch(new ChannelActions.ChangeChannel({id: channelId}))
        this._chatService.selectChannel(channelId)
            .then(() => {})
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
