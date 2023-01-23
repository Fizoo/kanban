import {isDevMode} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {Btn, buttonReducer} from "./reducerBtn";
import {IKanban, listReducer} from "./reducerList";

export interface State {
  kanban: IKanban
  btn: Btn[]
}

export const reducers: ActionReducerMap<State> = {
  kanban: listReducer,
  btn: buttonReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
