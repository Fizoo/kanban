import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Btn} from "./reducerBtn";
import {IKanban} from "./reducerList";


export namespace KanbanSelectors {

  export const kanban = createFeatureSelector<IKanban>('kanban');

  export const allTasks = createSelector(
    kanban,
    (state) => state)

  export const getActiveList = createSelector(
    kanban,
    state => ({
      ...state
      //return state.boards.map(el=>el.)
    })
  )

  export const getActualList = createSelector(
    kanban,
    state => [...state.boards].filter(board => board.name === state.activeListName)[0].columns
  )

  export const countColumns = createSelector(
    kanban,
    state => state
  )

  export const getColumnStatusById = createSelector(
    kanban,
    (state) => [...state.boards].filter(board => board.name === state.activeListName)
      .map(column => column.columns.map(el => el.name))[0]
  )

  export const getStatusIdAfterChange = (status: string) => createSelector(
    kanban,
    (state) => [...state.boards].filter(board => board.name === state.activeListName)[0]
      .columns.filter(column => column.name === status)[0].id
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
