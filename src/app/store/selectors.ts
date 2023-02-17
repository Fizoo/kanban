import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IKanban} from "./reducerList";
import {Columns} from "../../assets/data/model";

export namespace KanbanSelectors {

  export const kanban = createFeatureSelector<IKanban>('kanban');

  export const allState = createSelector(
    kanban,
    (state) => state)

  export const getCountOfStatus = (item: Columns) => createSelector(
    kanban,
    state => {
      const {boards, activeListName} = state;
      const activeBoard = boards.find(board => board.name === activeListName);
      if (!activeBoard) return 0;
      const activeList = activeBoard.columns.find(column => column.id === item.id);

      return activeList ? activeList.tasks.length : 0
    }
  )

  export const getActualList = createSelector(
    kanban,
    state => state.boards.find(board => board.name === state.activeListName)?.columns ?? []
  );

  export const getColumnStatusNames = createSelector(
    getActualList,
    columns => columns.map(column => column.name)
  )

  export const getAllStatusOfColumns = createSelector(
    getActualList,
    columns => columns.map(column => ({status: column.name, id: column.id}))
  )

  export const getBtnList = createSelector(
    kanban,
    state => state.boards.map(board => ({
      name: board.name,
      id: board.id,
      class: state.activeListName === board.name ? 'SideNav__tab SideNav__tab--active' : 'SideNav__tab'
    }))
  );

  export const getBtnListCount = createSelector(
    kanban,
    state => state.boards.length
  )

  export const getTitleName = createSelector(
    kanban,
    state => state.activeListName
  )

}
