export class GetToken {
    static readonly type = '[Token] Get Token';
}

export class ChangeToken {
    static readonly type = '[Token] Change Token';
    constructor(public payload: string) {}
}