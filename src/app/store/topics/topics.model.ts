export const TOPICS_STORAGE_KEY = 'topics.topic';

export type Topic = string;

export interface TopicInfo<T = any> {
    model: T
}

export class TopicStateModel {
    public topic: string[];
    public topicInfo: TopicInfo
}

export interface Extras {
    id : string,
    data: string[],
    system: string[]
}