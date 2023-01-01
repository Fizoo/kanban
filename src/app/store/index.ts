import {isDevMode} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {Boards} from "../../assets/data/model";
import {kanbanReducer} from "./reducers";

export interface State {
    kanban:Boards[]
}

export const reducers: ActionReducerMap<State> = {
    kanban:kanbanReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
