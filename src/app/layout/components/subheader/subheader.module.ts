import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubheaderComponent } from './subheader.component';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChannelSettingComponent } from '../../../main/apps/channel/channel-setting/channel-setting.component';
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [SubheaderComponent, ChannelSettingComponent],
  imports: [
    CommonModule,

      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatRadioModule,
      MatCheckboxModule,
      MatSidenavModule,
      MatToolbarModule,

      RouterModule,
      FuseSharedModule,
  ],
    exports: [
        SubheaderComponent
    ],
    entryComponents: []
})
export class SubheaderModule { }
