import { InMemoryDbService } from 'angular-in-memory-web-api';

import {ChatChannel} from './chat.channel';
import {ChatTopic} from './chat.topic';
import {ChatMessages} from './chat.messages';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {

            // Channel Panel
            'chat-channel' : ChatChannel.channel,

            // Chat Topic
            'chat-topic': ChatTopic.topic,

            // Chat Messages
            'chat-message': ChatMessages.messages
        };
    }
}
