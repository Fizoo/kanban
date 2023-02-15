import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IKanban} from "./reducerList";
import {Columns} from "../../assets/data/model";


export namespace KanbanSelectors {

  export const kanban = createFeatureSelector<IKanban>('kanban');

  export const allState = createSelector(
    kanban,
    (state) => state)

  export const countOfStatus = (item: Columns) => createSelector(
    kanban,
    state => {
      const {boards, activeListName} = state;
      const activeBoard = boards.find(board => board.name === activeListName);
      if (!activeBoard) return 0;
      const activeList = activeBoard.columns.find(column => column.id === item.id);

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

  export const getBtnList = createSelector(
    kanban,
    state => {
      return [...state.boards].map((el) => {
        if (state.activeListName === el.name) {
          return ({
            name: el.name,
            id: el.id,
            class: 'SideNav__tab SideNav__tab--active'
          })
        } else return ({
          name: el.name,
          id: el.id,
          class: 'SideNav__tab'
        })
      })
    }
  )

  export const getBtnListCount = createSelector(
    kanban,
    state => [...state.boards].length
  )

  export const titleName = createSelector(
    kanban,
    state => state.activeListName
  )

}
