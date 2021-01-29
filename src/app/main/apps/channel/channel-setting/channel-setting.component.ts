import {ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ChannelState} from "../../../../store/channel/channel.state";
import {Select} from "@ngxs/store";

@Component({
  selector: 'app-channel-setting',
  templateUrl: './channel-setting.component.html',
  styleUrls: ['./channel-setting.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChannelSettingComponent implements OnInit {

    @Select(ChannelState.getChannelSetting) channelSetting: Observable<Boolean>;
    showExtraToFields: boolean;
    settingForm: FormGroup;
    channelId: string;
    _isSetting: Boolean = false;
  constructor(
      private def: ChangeDetectorRef,
      public matDialogRef: MatDialogRef<ChannelSettingComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
      this.settingForm = this.createSetting();
      this.showExtraToFields = false;
      this.channelId = _data.channelId
  }

  ngOnInit(): void {
      this.channelSetting
          .subscribe(res => {
              this._isSetting = res;
          })
  }

    createSetting(): FormGroup
    {
        return new FormGroup({
            isCheck: new FormControl(false),
        })
    }

    changeCheckbox = (event) => {
        this._isSetting = !event;
        this.def.detectChanges();
    };

    channelOff = () => {
      if (window.confirm('This form will lose changes')) {
          this.matDialogRef.close()
      }
    }

}
