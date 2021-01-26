import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-channel-setting',
  templateUrl: './channel-setting.component.html',
  styleUrls: ['./channel-setting.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChannelSettingComponent implements OnInit {

    showExtraToFields: boolean;
    settingForm: FormGroup;
  constructor(
      public matDialogRef: MatDialogRef<ChannelSettingComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
      this.settingForm = this.createSetting();
      this.showExtraToFields = false;
  }

  ngOnInit(): void {
  }

    createSetting(): FormGroup
    {
        return new FormGroup({
            isCheck: new FormControl(false)
        })
    }

}
