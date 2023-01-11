import {Boards} from "../../assets/data/model";
import {Kanban} from "../../assets/data/data";
import {createReducer, on} from "@ngrx/store";
import {KanbanActions} from "./actions";

const initialState: Boards[] = Kanban.boards

export const kanbanReducer = createReducer(
  initialState,
  on(KanbanActions.getAll, state => state),

  on(KanbanActions.addBoard,
    (state, {board}) => {
      return [...state, board]
    }),

  on(KanbanActions.changeContentList,
    state => state),

  on(KanbanActions.deleteTask,
    (state, {task}) => {
      console.log('state1', state)
      return [...state].map(b => {
        if (b.id === task.statusId) {
          let newColumn = b.columns.map(c => ({
              ...c,
              tasks: c.tasks.filter(t => t.id !== task.id)
            })
          )
          return ({
            ...b,
            columns: newColumn
          })
        } else
          return b
      })
    }
  ),
  on(KanbanActions.editTask,
    (state, {task}) => {
      return state
    }
  ),
  on(KanbanActions.moveTask,
    (state, {task}) => {
      return [...state]
    }
  )
)
