import {Boards} from "../../assets/data/model";
import {Kanban} from "../../assets/data/data";
import {createReducer, on} from "@ngrx/store";
import {KanbanActions} from "./actions";

const initialState:Boards[]=Kanban.boards

export const kanbanReducer=createReducer(
  initialState,
  on(KanbanActions.getAll, state=>state),

  on(KanbanActions.addBoard,
    (state,{board})=>{
    return [...state,board]
    }),

  on(KanbanActions.changeContentList,
    state=>state),

  on(KanbanActions.deleteTask,
    (state, {task})=> {
        const newTask=[...state].map(el=>el.columns)
      return [
        ...state,
      ]
    }
  ),
  on(KanbanActions.moveTask,
    (state,{task})=> {
    return [...state]
    }
)
)
