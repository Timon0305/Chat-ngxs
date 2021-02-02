import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ChangeToken, GetToken} from "./token.actions";
import {TokenService} from "./token.service";
import {TokenModel} from "./token.model";


export interface TokenStateModel {
    selectedToken: TokenModel,
}
@State<TokenStateModel>({
    name: 'token',
    defaults: {
        selectedToken: null,
    }
})

@Injectable()
export class TokenState implements NgxsOnInit {
    constructor(
        private tokenService: TokenService
    ) {}

    @Selector()
    static getToken(state: TokenStateModel) {
        return state.selectedToken
    }

    ngxsOnInit(ctx: StateContext<TokenStateModel>) {
        ctx.dispatch(new GetToken())
    }

    @Action(GetToken)
    getToken({getState, setState}: StateContext<TokenStateModel>) {
        let state = getState();
        let data = {
            userId: '',
            token: ''
        };
        data.userId = localStorage.getItem('userId');
        data.token = localStorage.getItem('token');
        setState({
            ...state,
            selectedToken: data
        })
    }

    @Action(ChangeToken)
    changeToken({getState, setState}: StateContext<TokenStateModel>, {payload}: ChangeToken) {
        let state = getState();
        let data = this.tokenService.changeToken(payload);
        setState({
            ...state,
            selectedToken: data
        })
    }
}