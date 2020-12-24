export interface MessageModel {
    rows?: any,
    id?: string,
    data?: any,
    topicId?: string,
    text?: string,
    stats?: any,
    isRead: boolean,
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