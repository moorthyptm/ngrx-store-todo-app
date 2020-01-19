import * as ToDo from './store/todo.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    TodoList: ToDo.ITodoListModel;
}

export const appReducer: ActionReducerMap<AppState> = {
    TodoList: ToDo.TodoReducer
};
