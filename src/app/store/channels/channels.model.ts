export const CHANNELS_STORAGE_KEY = 'channels.channel';

export type Channel = string;

export interface ChannelInfo<T = any> {
    model: T;
}

export class ChannelStateModel {
    public channel: string[];
    public channelInfo: ChannelInfo;
}

export interface Extras {
    id: string;
    data: string[]
    system: string[]
}