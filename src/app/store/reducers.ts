import {Boards, Tasks} from "../../assets/data/model";
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
      return [...state].map(b => {
        return ({
          ...b,
          columns: b.columns.map(c => {
            if (c.name === task.status) {
              return ({
                ...c,
                tasks: c.tasks.filter(el => el.id !== task.id)
              })
            } else return c
          })
        })
      })
    }
  ),
  on(KanbanActions.moveTaskByStatus,
    (state, {task, newStatus, oldStatus, activeList}) => {
      console.log(activeList)
      return [...state].map(b => {
          if (b.name === activeList) {
            return ({
              ...b,
              columns: b.columns.map(c => {
                if (c.name === oldStatus) {
                  return ({
                    ...c,
                    tasks: [...c.tasks.filter(el => el.id !== task.id)]
                  })
                } else if (c.name === newStatus) {
                  let newTask: Tasks = {
                    ...task,
                    status: newStatus,
                    statusId: c.id,
                  }
                  return ({
                    ...c,
                    tasks: [...c.tasks, newTask]
                  })
                } else return c
              })
            })
          } else return b
        }
      )
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
  ),
  on(KanbanActions.changeTaskSubtaskCheck,
    (state, {task}) => {
      return [...state].map(b => {
        return ({
          ...b,
          columns: b.columns.map(c => c.name === task.status ? {
            ...c,
            tasks: c.tasks.map(t => t.id === task.id ? {
              ...t,
              subtasks: task.subtasks
            } : t),
          } : c)
        })
      })
    })
)
