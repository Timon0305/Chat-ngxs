import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from '@fuse/shared.module';

import { ChatComponent } from 'app/main/apps/chat/chat.component';
import { ChatStartComponent } from 'app/main/apps/chat/chat-start/chat-start.component';
import { ChatViewComponent } from 'app/main/apps/chat/chat-view/chat-view.component';
import { ChatUserSidenavComponent } from 'app/main/apps/chat/sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from 'app/main/apps/chat/sidenavs/left/left.component';
import { ChatRightSidenavComponent } from 'app/main/apps/chat/sidenavs/right/right.component';
import { ChatContactSidenavComponent } from 'app/main/apps/chat/sidenavs/right/contact/contact.component';
import { TopicsComponent } from './sidenavs/left/topics/topics.component';
import { AddChannelComponent } from '../channel/add-channel/add-channel.component';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AddTopicComponent } from './sidenavs/left/add-topic/add-topic.component';
import { TopicSettingComponent } from './sidenavs/left/topic-setting/topic-setting.component';
import { EditTopicComponent } from './sidenavs/left/edit-topic/edit-topic.component';
import { TopicStatusComponent } from './sidenavs/left/topic-status/topic-status.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../../../app.module";
import {HttpClient} from "@angular/common/http";

const routes: Routes = [
    {
        path: '**',
        component: ChatComponent,
        children: [],
    }
];

@NgModule({
    declarations: [
        ChatComponent,
        ChatViewComponent,
        ChatStartComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent,
        ChatRightSidenavComponent,
        ChatContactSidenavComponent,
        TopicsComponent,
        AddTopicComponent,
        TopicSettingComponent,
        EditTopicComponent,
        TopicStatusComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
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
        FuseSharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
    ],
    entryComponents: [AddChannelComponent, AddTopicComponent]
})
export class ChatModule
{
}
