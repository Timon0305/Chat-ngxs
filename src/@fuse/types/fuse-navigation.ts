export interface FuseNavigationItem
{
    id?: string;
    data?: any;
    name?: string,
    type?: string,
    status?: string,
    translate?: string,
    title?: any,
    subtitle?: any,
    classes?: string,
    active?: boolean,
    teaser?: any,
    slug?: any,
    tags?: any,
    features?: any,
    remarks?: any,
    options?: any,
    createdAt?: string,
    updatedAt?: string,
    spaceId?: string,
    userId?: string,
    model?: number,
    system?: any
    total?: number,
    page?: number,
    totalPages?: number
    rows?: any,
    profiles?: any,
    pageSize?: number
}

export interface FuseNavigation extends FuseNavigationItem
{
    children?: any
    data?: any
    profiles?: any
}
