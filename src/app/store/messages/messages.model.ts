export const MESSAGES_STORAGE_KEY = 'messages.message';

export type Message = string;

export interface MessageInfo<T = any> {
    rows?: any,
    id?: string,
    data?: any,
    channelId?: string,
    name?: string,
    status?: string,
    stats?: string,
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

export interface message extends MessageInfo
{
    rows?: any,
    data?: any
    stats?: any,
    system?: any,
}

export class MessageStateModel {
    public message: string[];
    public messageInfo: MessageInfo;
}
