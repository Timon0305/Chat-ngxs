import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-channel-status',
  templateUrl: './channel-status.component.html',
  styleUrls: ['./channel-status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChannelStatusComponent implements OnInit {

    showExtraToFields: boolean;
    statusForm: FormGroup;
    channelId: string;

    constructor(
        public matDialogRef: MatDialogRef<ChannelStatusComponent>,
    ) {
        this.statusForm = this.channelStatus();
        this.showExtraToFields = false;
    }

    ngOnInit(): void {
    }

    channelStatus(): FormGroup {
        return new FormGroup({
            isCheck: new FormControl(false),
        })
    }

    channelOff = () => {
        if (window.confirm('This form will lose changes')) {
            this.matDialogRef.close()
        }
    }
}