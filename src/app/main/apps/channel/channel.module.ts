import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddChannelComponent} from "./add-channel/add-channel.component";
import {EditChannelComponent} from "./edit-channel/edit-channel.component";
import {ChannelSettingComponent} from "./channel-setting/channel-setting.component";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatRadioModule} from "@angular/material/radio";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
      AddChannelComponent,
      EditChannelComponent,
      ChannelSettingComponent,
  ],
  imports: [
    CommonModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatRadioModule,
      MatSidenavModule,
      MatTableModule,
      MatToolbarModule,
      MatCheckboxModule,
      MatIconModule,
      MatTabsModule,
      FuseSharedModule
  ],
    entryComponents: [AddChannelComponent, ChannelSettingComponent]
})
export class ChannelModule { }
