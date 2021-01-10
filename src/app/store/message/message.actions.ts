export class SelectMessage {
    static readonly type = '[Message] Select Message';
    constructor(public payload: any){}
}

export class AddMessage {
    static readonly type = '[Message] Add Message';
    constructor(public payload: any) {}
}

export class UpdateMessage {
    static readonly type = '[Message] Update Message';
    constructor(public id: string, public payload: any) {}
}