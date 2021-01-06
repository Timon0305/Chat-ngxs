import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import {NavigationService} from '../../services/navigation.service';
import {Select, Store} from '@ngxs/store';
import {ChannelState} from '../../../app/store/channel/channel-state';
import {ChannelModel} from '../../../app/store/channel/channel-model';

@Component({
    selector       : 'fuse-navigation',
    templateUrl    : './navigation.component.html',
    styleUrls      : ['./navigation.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit
{
    @Select(ChannelState.getSelectedChannel) selectedChannel: Observable<ChannelModel>;
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param store
     * @param channelState
     * @param _chatService
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private store: Store,
        private channelState: ChannelState,
        private _chatService: NavigationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService
    )
    {
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Load the navigation
                this.navigation = this._fuseNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.selectedChannel
            .subscribe((res) => {
                if (res) {
                    for (let item of this.navigation[0].rows) {
                        item.active = item.id === res.id;
                    }
                }
            });

        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {
             this._changeDetectorRef.markForCheck();
         });
    }
}
