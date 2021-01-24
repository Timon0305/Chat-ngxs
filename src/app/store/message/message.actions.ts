export class FetchMessage {
    static readonly type = '[Message] Fetch Message';
    constructor(public payload: string) {}
}

export class AddMessage {
    static readonly type = '[Message] Add Message';
    constructor(public payload: any) {}
}
