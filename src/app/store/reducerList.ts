import {createReducer, on} from "@ngrx/store";
import {Boards, Tasks} from "../../assets/data/model";
import {Kanban} from "../../assets/data/data";
import {KanbanActions} from "./actions";
import {LOCAL_STORAGE_KEY} from "../services/local-storage.service";

export interface IKanban {
  boards: Boards[]
  activeListName: string
}

const initialState: IKanban = {
  boards: Kanban.boards,
  activeListName: Kanban.boards[0].name
}

export const listReducer = createReducer(
  initialState,
  on(KanbanActions.initial,
    (state) => {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      //const data = null
      return data ? JSON.parse(data) : state

    }
  ),
  on(KanbanActions.addBoard,
    (state, {board}) => ({
      ...state,
      boards: [...state.boards, board]
    })
  ),

  on(KanbanActions.changeActiveListName,
    (state, {name}) => ({
      ...state,
      activeListName: name
    })
  ),

  on(KanbanActions.deleteTask,
    (state, {task}) => ({
      ...state,
      boards: [...state.boards].map(board => board.name === state.activeListName ? {
        ...board,
        columns: board.columns.map(column => column.id === task.statusId ? {
          ...column,
          tasks: column.tasks.filter(t => t.id !== task.id)
        } : column)
      } : board),
    })
  ),

  on(KanbanActions.addTask,
    (state, {task}) => ({
      ...state,
      boards: [...state.boards].map(board => board.name === state.activeListName ? {
        ...board,
        columns: board.columns.map(column => column.id === task.statusId ? {
          ...column,
          tasks: [...column.tasks, task]
        } : column)
      } : board)
    })
  ),

  on(KanbanActions.editTask,
    (state, {task}) => ({
      ...state,
      boards: [...state.boards].map(board => board.name === state.activeListName ? {
        ...board,
        columns: board.columns.map(column => column.id === task.statusId ? {
          ...column,
          tasks: column.tasks.map(t => t.id === task.id ? task : t)
        } : column)
      } : board)
    })
  ),

  on(KanbanActions.changeTaskSubtaskCheck,
    (state, {task}) => ({
      ...state,
      boards: [...state.boards].map(board => board.name === state.activeListName ? {
        ...board,
        columns: board.columns.map(column => column.id === task.statusId ? {
          ...column,
          tasks: column.tasks.map(t => t.id === task.id ? {
            ...t,
            subtasks: task.subtasks
          } : t)
        } : column)
      } : board)
    })
  ),
  on(KanbanActions.addColumn,
    (state, {column}) => ({
      ...state,
      boards: [...state.boards].map(board => {
        if (board.name === state.activeListName) {
          let oldColumn = column.filter(el => board.columns.map(a => a.id).includes(el.id));
          let newColumn = column.filter(el => !board.columns.map(a => a.id).includes(el.id));

          let changedColumns = board.columns.map(c => {
            let temp = oldColumn.find(a => a.id === c.id);
            return temp && temp.column !== c.name ? {...c, name: temp.column} : c;
          });

          let newColumns = newColumn.map(a => ({
            tasks: [],
            name: a.column,
            id: a.id
          }))

          return ({
            ...board,
            columns: [...changedColumns, ...newColumns]
          })
        } else
          return board
      })
    })
  ),

  on(KanbanActions.moveTaskByStatus,
    (state, {task, newStatus, oldStatus}) => ({
      ...state,
      boards: [...state.boards].map(board => board.name === state.activeListName ? {
        ...board,
        columns: board.columns.map(column => {
          if (column.name === oldStatus) {
            return ({
              ...column,
              tasks: column.tasks.filter(t => t.id !== task.id)
            })
          } else if (column.name === newStatus) {
            let newTask = {
              ...task,
              status: newStatus,
              statusId: column.id,
            }
            return ({
              ...column,
              tasks: [...column.tasks, newTask]
            })
          } else return column
        })
      } : board)
    })
  ),

  on(KanbanActions.moveItemInArray,
    (state, {column, previousIndex, currentIndex}) => ({
      ...state,
      boards: [...state.boards].map(board => board.name === state.activeListName ? {
        ...board,
        columns: board.columns.map(c => {
          let newColumn = [...c.tasks]
          if (c.id === column.id) {
            let removed = newColumn.splice(previousIndex, 1)
            newColumn.splice(currentIndex, 0, removed[0])
            return ({
              ...c, tasks: newColumn
            })
          } else return c
        })
      } : board)
    })
  ),

  on(KanbanActions.transferArrayItem,
    (state, {previousContainer, container, previousIndex, currentIndex}) => ({
      ...state,
      boards: [...state.boards].map(board => {
        if (board.name === state.activeListName) {
          let deletedTask: Tasks = [...board.columns].filter(el => el.id === previousContainer)[0].tasks[previousIndex]
          return ({
            ...board,
            columns: board.columns.map(column => {
              let newTasks = [...column.tasks]
              if (column.id === previousContainer) {
                newTasks.splice(previousIndex, 1)
                return ({
                  ...column,
                  tasks: newTasks
                })
              }
              if (column.id === container) {
                newTasks.splice(currentIndex, 0, {
                  ...deletedTask,
                  statusId: column.id,
                  status: column.name
                })
                return ({
                  ...column,
                  tasks: newTasks
                })
              } else return column
            })
          })
        } else return board
      })
    })
  ),

  on(KanbanActions.deleteBoard,
    (state) => {
      const nameBoard = state.activeListName
      let newActiveName = [...state.boards].filter(el => el.name !== nameBoard)[0].name
      return ({
        ...state,
        boards: [...state.boards].filter(b => b.name !== nameBoard),
        activeListName: newActiveName
      })
    }
  ),

  on(KanbanActions.editBoard,
    (state, {board}) => {
      let newBoard: Boards = [...state.boards].filter(el => el.name === state.activeListName)[0]
      let newActiveName: string = board.name !== state.activeListName ? board.name : state.activeListName

      let newColumns = [...board.columns].filter(el => !newBoard.columns.map(a => a.id).includes(el.id))
      let changeColumns = [...board.columns].filter(el => newBoard.columns.map(a => a.id).includes(el.id))

      let boardChanged = newBoard.columns.map(c => {
        let tempColumn = changeColumns.find(el => el.id === c.id)
        return tempColumn && tempColumn.column !== c.name ? {...c, name: tempColumn.column} : c;
      })

      let addBoard = newColumns.map(el => ({
        name: el.column,
        id: el.id,
        tasks: []
      }))

      return ({
        ...state,
        activeListName: newActiveName,
        boards: [...state.boards].map(b => b.name === state.activeListName ? {
          ...b,
          name: newActiveName,
          columns: [...boardChanged, ...addBoard]
        } : b)
      })
    }
  )
)
