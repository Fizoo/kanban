import {createAction, props} from "@ngrx/store";
import {Boards, Columns, EditBoard, Tasks} from "../../assets/data/model";
import {Btn} from "./reducerBtn";


interface IColumn {
  column: string
  id: number
}

export enum KanbanNames {
  //Task,Column actions
  InitialState = '[Kanban] InitialState',
  GetAll = '[Kanban] Get All',
  MoveTask = '[Kanban] move',
  DeleteTask = '[Kanban] delete',
  AddTask = '[Kanban] addTask',
  AddBoard = '[Kanban] addBoard',
  AddColumns = '[Kanban] addColumns',
  ChangeContentList = '[Kanban] changeContentList',
  EditTask = '[Kanban] editTask',
  MoveTaskByStatus = '[Kanban] moveTaskByStatus',
  ChangeTaskSubtaskCheck = '[Kanban] changeTaskSubtaskCheck',
  ChangeActiveListName = '[Kanban] changeActiveListName',
  MoveItemInArray = '[Kanban] moveItemInArray',
  TransferArrayItem = '[Kanban] transferArrayItem',
  EditBoard = '[Kanban] editBoard',
  DeleteBoard = '[Kanban] deleteBoard',

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

  export const initial = createAction(KanbanNames.InitialState)

  export const getAll = createAction(KanbanNames.GetAll);

  export const addBoard = createAction(KanbanNames.AddBoard, props<{ board: Boards }>())

  export const changeContentList = createAction(KanbanNames.ChangeContentList, props<{ name: string }>())

  export const moveTask = createAction(KanbanNames.MoveTask, props<{ task: Tasks }>());

  export const editTask = createAction(KanbanNames.EditTask, props<{ task: Tasks }>());

  export const addTask = createAction(KanbanNames.AddTask, props<{ task: Tasks }>())

  export const deleteTask = createAction(KanbanNames.DeleteTask, props<{ task: Tasks }>())

  export const moveTaskByStatus = createAction(KanbanNames.MoveTaskByStatus, props<{ task: Tasks, newStatus: string, oldStatus: string }>())

  export const moveItemInArray = createAction(KanbanNames.MoveItemInArray, props<{ column: Columns, previousIndex: number, currentIndex: number }>())

  export const transferArrayItem = createAction(KanbanNames.TransferArrayItem, props<{ previousContainer: number, container: number, previousIndex: number, currentIndex: number }>())

  export const addColumn = createAction(KanbanNames.AddColumns, props<{ column: IColumn[] }>())

  export const editBoard = createAction(KanbanNames.EditBoard, props<{ board: EditBoard }>())

  export const deleteBoard = createAction(KanbanNames.DeleteBoard)

  export const changeTaskSubtaskCheck = createAction(KanbanNames.ChangeTaskSubtaskCheck, props<{ task: Tasks }>())

  export const changeActiveListName = createAction(KanbanNames.ChangeActiveListName, props<{ name: string }>())

}

export namespace BtnActions {


  export const getAll = createAction(KanbanNames.GetBtn);

  export const addBtn = createAction(KanbanNames.AddBtn, props<{ item: Btn }>())

}


