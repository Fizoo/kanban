import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Boards} from "../../assets/data/model";
import {Btn} from "./reducerBtn";

export namespace KanbanSelectors {
  export const kanban = createFeatureSelector<Boards[]>('kanban');

  export const allTasks = createSelector(
    kanban,
    (state) => state)

    export const getContentList=(name: string='') =>createSelector(
      kanban,
    state => {
        if(!!name) {
       return   [...state].filter(el => el.name === name).map(el=>el.columns)[0]
        }
        else
          return   [...state][0].columns
    }
  )

  export const countColumns = createSelector(
    kanban,
    state => state.length
  )
//  export const actual

}

export namespace BtnSelectors {

  export const btn = createFeatureSelector<Btn[]>('btn')

  export const getBtn = createSelector(
    btn,
    state => state
  )
  export const btnCount = createSelector(
    btn,
    state => state.length
  )

  export const activeName = createSelector(
    btn,
    state => {
      return [...state].filter(el => el.class.includes('SideNav__tab--active'))[0].name.trim()
    }
  )




}
