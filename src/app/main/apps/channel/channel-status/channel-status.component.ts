import {Component,  OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormControl, FormGroup} from "@angular/forms";
import { MatDialogRef} from "@angular/material/dialog";
import {ChannelState} from "../../../../store/channel/channel.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {ChannelModel} from "../../../../store/channel/channel.model";

@Component({
  selector: 'app-channel-status',
  templateUrl: './channel-status.component.html',
  styleUrls: ['./channel-status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChannelStatusComponent implements OnInit {

    @Select(ChannelState.getChannelStatus) getStatus: Observable<Boolean>;
    showExtraToFields: boolean;
    statusForm: FormGroup;
    channelId: string;
    _status: Boolean = false;

    constructor(
        public matDialogRef: MatDialogRef<ChannelStatusComponent>,
    ) {
        this.statusForm = this.channelStatus();
        this.showExtraToFields = false;
    }

    ngOnInit(): void {
        this.getStatus.subscribe(res => {
            this._status = res;
        })
    }

    channelStatus(): FormGroup {
        return new FormGroup({
            isCheck: new FormControl(this._status),
        })
    }

    changeCheckbox = (event) => {
        this._status = !event
    };

    channelOff = () => {
        if (window.confirm('This form will lose changes')) {
            this.matDialogRef.close()
        }
    }
}