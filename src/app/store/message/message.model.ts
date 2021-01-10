export class MessageModel {
    id?: string;
    data?: {
        topicId: string;
        text?: string;
        stats: {
            isRead: boolean;
        };
        system: {
            createAt: string;
            updatedAt: string;
            spaceId: string;
            userId: string;
            model: number
        }
    }
}