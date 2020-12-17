import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'chat',
                title    : 'Chat',
                translate: 'NAV.CHAT',
                type     : 'item',
                icon     : 'chat',
                url      : '/apps/chat',
            },
        ]
    }
];
