import {isDevMode} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {IKanban, listReducer} from "./reducerList";

export interface State {
  kanban: IKanban
}

export const reducers: ActionReducerMap<State> = {
  kanban: listReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
