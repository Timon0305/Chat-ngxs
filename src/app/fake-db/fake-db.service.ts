import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ChatFakeDb } from 'app/fake-db/chat';
import { ContactsFakeDb } from 'app/fake-db/contacts';
import { ProfileFakeDb } from 'app/fake-db/profile';
import { ChatPanelFakeDb } from 'app/fake-db/chat-panel';
import {ChatChannel} from './chat-channel';
import {ChatTopic} from './chat-topic';
import {ChatMessages} from './chat-messages';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Chat
            'chat-contacts': ChatFakeDb.contacts,
            'chat-chats'   : ChatFakeDb.chats,
            'chat-user'    : ChatFakeDb.user,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user'    : ContactsFakeDb.user,

            // Profile
            'profile-timeline'     : ProfileFakeDb.timeline,
            'profile-photos-videos': ProfileFakeDb.photosVideos,
            'profile-about'        : ProfileFakeDb.about,

            // Chat Panel
            'chat-panel-contacts' : ChatPanelFakeDb.contacts,
            'chat-panel-chats': ChatPanelFakeDb.chats,
            'chat-panel-user': ChatPanelFakeDb.user,

            // Channel Panel
            'chat-channel' : ChatChannel.channel,

            // Chat Topic
            'chat-topic': ChatTopic.topic,

            // Chat Messages
            'chat-message': ChatMessages.messages
        };
    }
}
