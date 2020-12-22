export interface FuseNavigationItem
{
    id?: string;
    data?: any;
    name?: string,
    avatar?: string,
    type?: string,
    status?: string,
    users?: number,
    classes?: string,
    active?: boolean,
    topics?: number,
    newMessages?: number,
    createdAt?: string,
    updatedAt?: string,
    spaceId?: string,
    userId?: string,
    model?: number,
    stats?: any
    system?: any
    total?: number,
    page?: number,
    totalPages?: number
    rows?: any,
    pageSize?: number
}

export interface FuseNavigation extends FuseNavigationItem
{
    children?: any
    data?: any
    stats?: any
}
