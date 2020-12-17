import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ChatFakeDb } from 'app/fake-db/chat';
import { ContactsFakeDb } from 'app/fake-db/contacts';
import { ProfileFakeDb } from 'app/fake-db/profile';
import { ChatPanelFakeDb } from 'app/fake-db/chat-panel';
import { QuickPanelFakeDb } from 'app/fake-db/quick-panel';

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

            // Quick Panel
            'quick-panel-notes' : QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events
        };
    }
}
