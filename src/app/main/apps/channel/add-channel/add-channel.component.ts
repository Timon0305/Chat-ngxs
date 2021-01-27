import {ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {Select, Store} from "@ngxs/store";
import {BrowseChannelState} from "../../../../store/browseChannel/browse.channel.state";
import {Observable} from "rxjs";
import {BrowseChannelModel} from "../../../../store/browseChannel/browse.channel.model";
import {FetchPageBrowsChannel, SubscribeChannel} from "../../../../store/browseChannel/browse.channel.actions";
import {SubscibeChannelComponent} from "../subscibe-channel/subscibe-channel.component";

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddChannelComponent implements OnInit {

    @Select(BrowseChannelState.getBrowseChannelList) browseChannel: Observable<BrowseChannelModel>;
    @Select(BrowseChannelState.getBrowseChannelPage) browseChannelPage: Observable<number>;
    @Select(BrowseChannelState.getBrowseChannelTotalPage) browseChannelTotalPage: Observable<number>;

    showExtraToFields: boolean;
    composeForm: FormGroup;
    dataSource: PeriodicElement[] = [];
    displayedColumns: string[] = ['id', 'name', 'type', 'users', 'subtitle'];
    pageNum: number;
    totalNum: number;
    dialogRef: any;

  constructor(
      private store: Store,
      private def: ChangeDetectorRef,
      public _matDialog: MatDialog,
      public matDialogRef: MatDialogRef<AddChannelComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any

  ) {
      this.composeForm = this.createNewChannel();
      this.showExtraToFields = false;
  }

    ngOnInit(): void
    {
        this.browseChannelPage
            .subscribe(res => {
                this.pageNum = res;
                this.def.detectChanges();
            });

        this.browseChannelTotalPage
            .subscribe(res => {
                this.totalNum = res
            });

        this.browseChannel
            .subscribe((res: any) => {
                this.dataSource = res;
            })
    }

    createNewChannel(): FormGroup
    {
        return new FormGroup({
            title: new FormControl(''),
            description: new FormControl(''),
            type: new FormControl(''),
            subscribe: new FormControl(''),
            space: new FormControl(''),
            visibility: new FormControl('')
        });
    }


    prePage = (pNum) => {
        if (pNum === 1) {
            return;
        } else {
            let pageNum = --this.pageNum;
            this.store.dispatch(new FetchPageBrowsChannel(pageNum))
        }
    };

    nextPage = (pNum) => {
        if (pNum === this.totalNum) {
            return;
        } else {
            let pageNum = ++this.pageNum;
            this.store.dispatch(new FetchPageBrowsChannel(pageNum))
        }
    };

    subscribeToChannel = (channel) => {
        if (channel['user']['isSubscribed']) {
            return;
        }
        else {
            this.dialogRef = this._matDialog.open(SubscibeChannelComponent, {
                panelClass: 'sub-compose-dialog',
                data: {
                    channel: channel
                }
            });
            this.dialogRef.afterClosed()
                .subscribe(response => {
                    if (!response) {
                        return;
                    }
                    this.isSubscribed(channel);
                })
        }

    };

    isSubscribed = (channel) => {
        this.store.dispatch(new SubscribeChannel(channel))
    }
}

export interface PeriodicElement {
    id: string;
    name: string;
    type: string;
    users: string;
    subtitle: string;
}