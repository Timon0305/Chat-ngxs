import {Component, Directive, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {Observable, Subject} from "rxjs";
import {Select} from "@ngxs/store";
import {ChannelState} from "../../../../store/channel/channel.state";
import {ChannelModel} from "../../../../store/channel/channel.model";



@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddChannelComponent implements OnInit {
    @Select(ChannelState.getChannelList) channels: Observable<ChannelModel[]>;

    showExtraToFields: boolean;
    composeForm: FormGroup;
    dataSource: PeriodicElement[] = [];
    displayedColumns: string[] = ['id', 'name', 'type', 'users', 'subtitle'];
    checkboxes: {};

  constructor(
      public matDialogRef: MatDialogRef<AddChannelComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
      this.composeForm = this.createComposeForm();
      this.showExtraToFields = false;
  }

    ngOnInit(): void
    {

        this.channels.subscribe((res: any) => {
            console.log(res)
            this.dataSource = res

        })
    }


    createComposeForm(): FormGroup
    {
        return new FormGroup({
            title: new FormControl(''),
            subtitle: new FormControl(''),
            publish: new FormControl(''),
            public: new FormControl('')
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