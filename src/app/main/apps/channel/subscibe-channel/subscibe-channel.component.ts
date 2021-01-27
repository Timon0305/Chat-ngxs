import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {ChannelModel} from "../../../../store/channel/channel.model";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
  selector: 'app-subscibe-channel',
  templateUrl: './subscibe-channel.component.html',
  styleUrls: ['./subscibe-channel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SubscibeChannelComponent implements OnInit {

    showExtraToFields: boolean;
    subscribeForm: FormGroup;
    channelData: ChannelModel;

  constructor(
      public matDialogRef: MatDialogRef<SubscibeChannelComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
      this.channelData = _data.channel;
      this.subscribeForm = this.subscribeChannel();
      this.showExtraToFields = false;
  }

  ngOnInit(): void {
  }

    subscribeChannel(): FormGroup {
      return new FormGroup({})
    }

    channelOff = () => {
        if (window.confirm('This form will lose changes')) {
            this.matDialogRef.close()
        }
    }

}
