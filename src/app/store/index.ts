import {isDevMode} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {Boards} from "../../assets/data/model";
import {kanbanReducer} from "./reducers";
import {Btn, buttonReducer} from "./reducerBtn";

export interface State {
    kanban:Boards[]
    btn:Btn[]
}

export const reducers: ActionReducerMap<State> = {
    kanban:kanbanReducer,
    btn:buttonReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
