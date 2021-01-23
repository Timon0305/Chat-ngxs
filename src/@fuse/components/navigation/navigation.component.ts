import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {Select, Store} from '@ngxs/store';
import {ChannelState} from '../../../app/store/channel/channel.state';
import {ChannelModel} from '../../../app/store/channel/channel.model';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {AddChannelComponent} from '../../../app/main/apps/chat/add-channel/add-channel.component';

'use strict';

@Component({
    selector: 'fuse-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit {
    @Select(ChannelState.getChannelList) channels: Observable<ChannelModel[]>;
    @Select(ChannelState.getSelectedChannel) selectedChannel: Observable<ChannelModel>;
    @Input() layout = 'vertical';
    navigation: any;
    dialogRef: any;
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param def
     * @param store
     * @param channelState
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     * @param _matDialog
     */
    constructor(
        private def: ChangeDetectorRef,
        private store: Store,
        private channelState: ChannelState,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        public _matDialog: MatDialog
    ) {
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.channels
            .subscribe(res => {
                this.navigation = res;
                this.def.detectChanges();
            });

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
                    let data = [];
                    for (let item of this.navigation) {
                        if (item.active === undefined) {
                            item = item.id === res.id ?
                                Object.assign({active: true}, item) :
                                Object.assign({active: false}, item);

                        } else {
                            item.active = item.id === res.id;
                        }
                        data.push(item);
                    }
                    this.navigation = data;
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

    addChannel(): void {
        this.dialogRef = this._matDialog.open(AddChannelComponent, {
            panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Send
                     */
                    case 'send':
                        console.log('new Mail', formData.getRawValue());
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete Mail');
                        break;
                }
            })
    }
}
