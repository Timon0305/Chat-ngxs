export const MESSAGES_STORAGE_KEY = 'messages.message';

export type Message = string;

export interface MessageInfo<T = any> {
    model: T
}

export class MessageStateModel {
    public message: string[];
    public messageInfo: MessageInfo;
}

export interface Extras {
    id: string;
    data: string[];
    system: string[];
}