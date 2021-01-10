export class SelectMessage {
    static readonly type = '[Message] Select Message';
    constructor(public payload: any){}
}

export class AddMessage {
    static readonly type = '[Message] Add Message';
    constructor(public payload: any) {}
}
