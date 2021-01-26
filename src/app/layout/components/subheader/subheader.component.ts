import {Component,  OnInit, } from '@angular/core';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {ChannelState} from '../../../store/channel/channel.state';
import {ChannelModel} from '../../../store/channel/channel.model';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {ChannelSettingComponent} from "../../../main/apps/channel/channel-setting/channel-setting.component";
import {SetNotification} from "../../../store/channel/channel.actions";
import {EditChannelComponent} from "../../../main/apps/channel/edit-channel/edit-channel.component";

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {

    @Select(ChannelState.getSelectedChannel) selectedChannel: Observable<ChannelModel>;

    selectChannel: any;
    channelName: string;
    channelId: string;
    userNum: number;
    channelType: string;
    isAdmin: boolean;
    dialogRef: any;

  constructor(
      public _matDialog: MatDialog,
      private store: Store,
  ) {}

  ngOnInit(): void {
      this.selectedChannel
          .subscribe(channelData => {
              this.selectChannel = channelData;
              if (channelData) {
                  this.channelName = channelData.data.name;
                  this.userNum = channelData.data.stats.userCount;
                  this.channelId = channelData.id;
                  this.channelType = channelData.data.type;
                  this.isAdmin = channelData.system.userId === localStorage.getItem('userId')
              }
          });
  }


    editChannel = (channel) => {
        this.dialogRef = this._matDialog.open(EditChannelComponent, {
            panelClass: 'mail-compose-dialog',
            data: {
                channel: channel
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
            })
    };

    channelSetting = (id) => {
        this.dialogRef = this._matDialog.open(ChannelSettingComponent,  {
            panelClass: 'mail-compose-dialog',
            data: {
                channelId: id
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    case 'save' :
                        this.saveSetting(formData.getRawValue());
                        break;
                }
            })
    };

    saveSetting = (value) => {
        let notification = {
            notify: value.isCheck,
            channelId: this.channelId
        };
        this.store.dispatch(new SetNotification(notification))
    }
}
