export const TOPICS_STORAGE_KEY = 'topics.topic';

export type Topic = string;

export interface TopicInfo<T = any> {
    rows?: any,
    id?: string;
    data?: any;
    name?: string,
    channelId?: string,
    status?: string,
    stats?: any,
    active?: boolean,
    newMessages?: number,
    system?: any,
    createdAt?: string,
    updatedAt?: string,
    spaceId?: string,
    userId?: string,
    model?: number,
    total?: number,
    page?: number,
    totalPages?: number
    pageSize?: number
}

export interface topic extends TopicInfo
{
    rows?: any,
    data?: any
    stats?: any,
    system?: any,
}

export class TopicStateModel {
    public topic: string[];
    public topicInfo: TopicInfo
}

