import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Boards} from "../../assets/data/model";

export namespace KanbanSelectors{
  export const kanban=createFeatureSelector<Boards[]>('kanban');

  export const allTasks=createSelector(
    kanban,
    (state)=>state
  )

  export const countColumns=createSelector(
    kanban,
    state=>state.length
  )

//  export const actual

}
