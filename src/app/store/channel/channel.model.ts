export class ChannelModel {
    id?: string;
    data?: {
        name?: string;
        type?: string;
        status?: string;
        title?: null;
        subtitle?: null;
        teaser?: null;
        slug?: null;
        tags?: null;
        features?: null;
        remarks?: null;
        options?: null;
        profiles?: [{
            id?: string;
            name?: string
        }]
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