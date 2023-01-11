import {createAction, props} from "@ngrx/store";
import {Boards, Subtask, Tasks} from "../../assets/data/model";
import {Btn} from "./reducerBtn";

export enum KanbanNames {

  //Task,Column actions
  GetAll = '[Kanban] Get All',
  MoveTask = '[Kanban] move',
  DeleteTask = '[Kanban] delete',
  CheckSubTask = '[Kanban] checkSubTask',
  SaveLocalStorage = '[Kanban] saveLocalStorage',
  GetWithLocalStorage = '[Kanban] getWithLocalStorage',
  AddBoard = '[Kanban] addBoard',
  ChangeContentList = '[Kanban] changeContentList',
  EditTask = '[Kanban] editTask',

  //UI actions
  GetUI = '[UI] getUI',
  ChangeDarkMode = '[UI] changeDarkMode',

  //Btn actions
  GetBtn = '[Btn] get',
  AddBtn = '[Btn] add',
  DeleteBtn = '[Btn] delete',
  ActiveBtn = '[Btn] active',
  GetActiveName = '[Btn] getActiveName',
  ActiveNameBtn = '[Btn] getActiveName'
}

export namespace KanbanActions {

  export const getAll = createAction(KanbanNames.GetAll);

  export const addBoard = createAction(KanbanNames.AddBoard, props<{ board: Boards }>())

  export const changeContentList = createAction(KanbanNames.ChangeContentList, props<{ name: string }>())

  export const moveTask = createAction(KanbanNames.MoveTask, props<{ task: Tasks }>());

  export const editTask = createAction(KanbanNames.EditTask, props<{ task: Tasks }>());

  export const deleteTask = createAction(KanbanNames.DeleteTask, props<{ task: Tasks }>())

  export const checkSubTask = createAction(KanbanNames.CheckSubTask, props<{ subTask: Subtask }>())

  export const saveLocalStorage = createAction(KanbanNames.SaveLocalStorage, props<{ list: Boards }>())

  export const getWithLocalStorage = createAction(KanbanNames.GetWithLocalStorage, props<{ list: Boards }>())


}

export namespace BtnActions {
  export const getAll = createAction(KanbanNames.GetBtn);

  export const addBtn = createAction(KanbanNames.AddBtn, props<{ item: Btn }>())

  export const activeBtn = createAction(KanbanNames.ActiveBtn, props<{ item: Btn }>())


}
