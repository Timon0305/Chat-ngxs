import {Component,  OnInit, } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NavigationService} from '../../../../@fuse/services/navigation.service';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {

    selectedChannel: any;
    channelName: string;
    userNum: number;
    channelType: string;
    private _unsubscribeAll: Subject<any>;

  constructor(
      private _chatService: NavigationService
  ) {
      this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
      this._chatService.changeChannel
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(channelData => {
              this.selectedChannel = channelData;
              if (channelData) {
                  this.channelName = channelData.data.name;
                  this.userNum = channelData.data.stats.users;
                  this.channelType = channelData.data.type;
              }
          })
  }

}
