import {Component, Directive, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {ChannelState} from "../../../../store/channel/channel.state";
import {ChannelModel} from "../../../../store/channel/channel.model";
import {isBoolean} from "util";
import {SubscribedChannel} from "../../../../store/channel/channel.actions";
import {MatPaginator} from "@angular/material/paginator";



@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddChannelComponent implements OnInit {

    showExtraToFields: boolean;
    composeForm: FormGroup;
    dataSource: PeriodicElement[] = [];
    displayedColumns: string[] = ['id', 'name', 'type', 'users', 'subtitle'];
    paginator: MatPaginator;
    checkboxes: {};

  constructor(
      private store: Store,
      public matDialogRef: MatDialogRef<AddChannelComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any

  ) {
      this.composeForm = this.createComposeForm();
      this.showExtraToFields = false;
  }

    ngOnInit(): void
    {
        this.store.dispatch(new SubscribedChannel())
            .subscribe(res => {
                this.dataSource = res['channelList']['subscribedChannel'];
                console.log(res['channelList'])
                this.paginator = res['total'];
            })
    }

    createComposeForm(): FormGroup
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

    toggleExtraToFields(): void
    {
        this.showExtraToFields = !this.showExtraToFields;
    }
}

export interface PeriodicElement {
    id: string;
    name: string;
    type: string;
    users: string;
    subtitle: string;
}