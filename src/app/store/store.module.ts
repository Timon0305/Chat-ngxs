import {NgModule} from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import {CommonModule} from '@angular/common';
import { NgxsFormPluginModule} from '@ngxs/form-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';

import { environment } from 'environments/environment';
import {TodoState} from './todos/todo/todo.state';
import {TodosState} from './todos/todos.state';


@NgModule({
    imports: [
        CommonModule,
        NgxsFormPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot({logger: console, collapsed: false}),
        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        NgxsRouterPluginModule.forRoot(),
        NgxsModule.forRoot([TodosState, TodoState], {
            developmentMode: !environment.production,
            selectorOptions: {}
        })
    ],
    exports: [
        NgxsFormPluginModule,
        NgxsLoggerPluginModule,
        NgxsReduxDevtoolsPluginModule,
        NgxsModule
    ]
})
export class AppStoreModule
{
}
