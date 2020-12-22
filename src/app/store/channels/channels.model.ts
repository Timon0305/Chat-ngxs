export const CHANNELS_STORAGE_KEY = 'channels.channel';

export type Channel = string;

export interface ChannelInfo<T = any> {
    rows?: any,
    id?: string,
    data?: any,
    name?: string,
    avatar?: string,
    type?: string,
    status?: string,
    stats?: any,
    users?: number,
    topics?: number,
    newMessages?: number,
    system?: any,
    createdAt?: string,
    updatedAt?: string,
    spaceId?: string,
    userId?: string,
    model?: number,
    total?: number,
    page?: number,
    pageSize?: number,
    totalPages?: number
}

export class ChannelStateModel {
    public channel: string[];
    public channelInfo: ChannelInfo;
}
