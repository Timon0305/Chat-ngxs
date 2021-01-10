export class ChannelModel {
    id?: string;
    data?: {
        name?: string;
        avatar?: string;
        type?: any;
        status?: boolean;
        stats?: {
            users: number;
            topics: number;
            newMessages: number
        }
    };
    system?: {
        createdAt?: string;
        updatedAt?: string;
        spaceId?: string;
        userId?: string;
        model?: number
    };
    active?: boolean;
}