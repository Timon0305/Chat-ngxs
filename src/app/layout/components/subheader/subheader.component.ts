import {Component,  OnInit, } from '@angular/core';
import {takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Select, Selector, Store} from '@ngxs/store';
import {NavigationService} from '../../../../@fuse/services/navigation.service';
import {ChannelState} from '../../../store/channel/channel-state';
import {ChannelModel} from '../../../store/channel/channel-model';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {

    @Select(ChannelState.getSelectedChannel) selectedChannel: Observable<ChannelModel>;

    selectChannel: any;
    channelName: string;
    userNum: number;
    channelType: string;

  constructor() {}

  ngOnInit(): void {
      this.selectedChannel
          .subscribe(channelData => {
              this.selectChannel = channelData;
              if (channelData) {
                  this.channelName = channelData.data.name;
                  this.userNum = channelData.data.stats.users;
                  this.channelType = channelData.data.type;
              }
          })
  }

}
