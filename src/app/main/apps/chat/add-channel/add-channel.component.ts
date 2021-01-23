import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {fuseAnimations} from "../../../../../@fuse/animations";
import { DataSource } from '@angular/cdk/collections';
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddChannelComponent implements OnInit, OnDestroy {
    showExtraToFields: boolean;
    composeForm: FormGroup;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'name', 'type', 'users', 'jobTitle'];
    checkboxes: {};
    private _unsubscribeAll: Subject<any>;

  constructor(
      public matDialogRef: MatDialogRef<AddChannelComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
      this.composeForm = this.createComposeForm();
      this.showExtraToFields = false;
  }

    ngOnInit(): void
    {
        // this.dataSource = new FilesDataSource();
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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

export class FilesDataSource extends DataSource<any>
{
    constructor() {
        super();
    }
    connect(): Observable<any[]> {
        return
    }
    disconnect(): void {}
}

