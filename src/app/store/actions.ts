import {createAction, props} from "@ngrx/store";
import {Boards, Subtask, Tasks} from "../../assets/data/model";

export enum KanbanNames{
  GetAll='[Kanban] Get All',
  MoveTask='[Kanban] move',
  DeleteTask='[Kanban] delete',
  CheckSubTask='[Kanban] checkSubTask',
  SaveLocalStorage='[Kanban] saveLocalStorage',
  GetWithLocalStorage='[Kanban] getWithLocalStorage',

  GetUI='[UI] getUI',
  ChangeDarkMode='[UI] changeDarkMode',
}

export namespace KanbanActions{

  export const getAll=createAction(KanbanNames.GetAll);

  export const moveTask=createAction(KanbanNames.MoveTask,props<{task:Tasks}>());

  export const deleteTask=createAction(KanbanNames.DeleteTask,props<{task:Tasks}>())

  export const checkSubTask=createAction(KanbanNames.CheckSubTask,props<{subTask:Subtask}>())

  export const saveLocalStorage=createAction(KanbanNames.SaveLocalStorage,props<{list:Boards}>())

  export const getWithLocalStorage=createAction(KanbanNames.GetWithLocalStorage,props<{list:Boards}>())
}
