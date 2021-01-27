import {ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Select, Store} from "@ngxs/store";
import { FormControl, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {ChannelModel} from "../../../../store/channel/channel.model";
import {Observable} from "rxjs";
import {ChannelState} from "../../../../store/channel/channel.state";

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EditChannelComponent implements OnInit {

    showExtraToFields: boolean;
    editChannelForm: FormGroup;
    channel: ChannelModel;

  constructor(
      private store: Store,
      private def: ChangeDetectorRef,
      public matDialogRef: MatDialogRef<EditChannelComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
      this.channel = _data.channel;
      this.editChannelForm = this.editChannel();
      this.showExtraToFields = false;

  }

  ngOnInit(): void {
  }

    editChannel(): FormGroup
    {
        return new FormGroup({
            title: new FormControl(this.channel['data']['name']),
            description: new FormControl(this.channel['data']['description']),
        });
    }

    channelOff = () => {
      if (window.confirm('This form will lose changes')) {
          this.matDialogRef.close()
      }
    }
}
