import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Btn} from "./reducerBtn";
import {IKanban} from "./reducerList";
import {Columns} from "../../assets/data/model";


export namespace KanbanSelectors {

  export const kanban = createFeatureSelector<IKanban>('kanban');

  export const allTasks = createSelector(
    kanban,
    (state) => state)

  export const countOfStatus = (item: Columns) => createSelector(
    kanban,
    state => {
      const {boards, activeListName} = state;
      const activeBoard = boards.find(board => board.name === activeListName);
      if (!activeBoard) return 0;
      const activeList = activeBoard.columns.find(column => column.name === item.name);

      return activeList ? activeList.tasks.length : 0
    }
  )

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

  export const getAllStatusOfColumns = createSelector(
    kanban,
    state => {
      let newBoard = [...state.boards].find(board => board.name === state.activeListName);
      if (!!newBoard) {
        return newBoard.columns.map(el => ({status: el.name, id: el.id}))
      }
      return []
    }
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
