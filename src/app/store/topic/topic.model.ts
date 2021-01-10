export interface TopicModel {
    id: string;
    data?: {
        channelId: string;
        name: string;
        status: string;
        stats: {
            newMessages: number;
        },
        system: {
            createdAt: string;
            updatedAt: string;
            spaceId: string;
            userId: string;
            model: number;
        }
    }
}