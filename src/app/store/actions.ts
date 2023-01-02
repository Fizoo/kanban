import {createAction, props} from "@ngrx/store";
import {Boards, Subtask, Tasks} from "../../assets/data/model";
import {Btn} from "./reducerBtn";

export enum KanbanNames{
  GetAll='[Kanban] Get All',
  MoveTask='[Kanban] move',
  DeleteTask='[Kanban] delete',
  CheckSubTask='[Kanban] checkSubTask',
  SaveLocalStorage='[Kanban] saveLocalStorage',
  GetWithLocalStorage='[Kanban] getWithLocalStorage',

  GetUI='[UI] getUI',
  ChangeDarkMode='[UI] changeDarkMode',

  GetBtn='[Btn] get',
  AddBtn='[Btn] add',
  DeleteBtn='[Btn] delete',
  ActiveBtn='[Btn] active',
  GetActiveName='[Btn] getActiveName'
}

export namespace KanbanActions{

  export const getAll=createAction(KanbanNames.GetAll);

  export const moveTask=createAction(KanbanNames.MoveTask,props<{task:Tasks}>());

  export const deleteTask=createAction(KanbanNames.DeleteTask,props<{task:Tasks}>())

  export const checkSubTask=createAction(KanbanNames.CheckSubTask,props<{subTask:Subtask}>())

  export const saveLocalStorage=createAction(KanbanNames.SaveLocalStorage,props<{list:Boards}>())

  export const getWithLocalStorage=createAction(KanbanNames.GetWithLocalStorage,props<{list:Boards}>())


}

export namespace BtnActions{
  export const getAll=createAction(KanbanNames.GetBtn);

  export const addBtn=createAction(KanbanNames.AddBtn,props<{item:Btn}>())

  export const activeBtn=createAction(KanbanNames.ActiveBtn,props<{item:Btn}>())
}
