import {Action, Select, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';

import {tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {TodoState} from './todo/todo.state';
import {Pizza, TodoStateModel} from './todos.model';
import {LoadData, SetPrefix} from './todos.actions';
import {Injectable} from '@angular/core';

const TODOS_TOKEN: StateToken<TodoStateModel> = new StateToken('todos');

@State<TodoStateModel>({
    name: TODOS_TOKEN,
    defaults: {
        todo: [],
        pizza: {
            model: undefined
        }
    },
    children: [TodoState]
})

@Injectable()
export class TodosState {
    @Selector()
    public static pizza(state: TodoStateModel): Pizza {
        return state.pizza;
    }

    @Action(SetPrefix)
    public setPrefix({setState}: StateContext<TodoStateModel>) {
        setState(
            patch({
                pizza: patch({
                    model: patch({
                        toppings: (topping: any) => 'Mr. ' + topping
                    })
                })
            })
        );
    }

    @Action(LoadData)
    public loadData({patchState} :  StateContext<TodoStateModel>) {
        const data = {toppings: 'chat', crust: 'medium', extra: [false, false, true]};
        return of(data).pipe(tap(values => patchState({pizza: {model: {...values}}})))
    }
}