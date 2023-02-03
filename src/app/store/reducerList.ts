import {createReducer, on} from "@ngrx/store";
import {Boards, Tasks} from "../../assets/data/model";
import {Kanban} from "../../assets/data/data";
import {KanbanActions} from "./actions";

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
                console.log('newTasks', newTasks)
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
  /*on(KanbanActions.transferArrayItem2,
    (state, {previousContainerId, containerId, previousIndex, currentIndex}) => {
      const {boards, activeListName} = state;
      const activeBoard = boards.find(board => board.name === activeListName);
      if (!activeBoard) return state;

      const previousContainer = activeBoard.columns.find(column => column.id === previousContainerId);
      const container = activeBoard.columns.find(column => column.id === containerId);

      const deletedTask = previousContainer.tasks.splice(previousIndex, 1)[0];
      container.tasks.splice(currentIndex, 0, {
        ...deletedTask,
        statusId: container.id,
        status: container.name
      });

      return {
        ...state,
        boards: [...boards]
      }
    }),*/
)
