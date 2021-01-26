import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import {ChannelModule} from "./channel/channel.module";

const routes = [
    {
        path        : 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        ChannelModule
    ],
    declarations: []
})
export class AppsModule
{
}
