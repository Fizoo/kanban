import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap} from 'rxjs';
import {KanbanNames} from "./store/actions";
import {ListNameService} from "./services/list-name.service";
import {LOCAL_STORAGE_KEY, LocalStorageService} from "./services/local-storage.service";
import {Store} from "@ngrx/store";
import {KanbanSelectors} from "./store/selectors";


@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private listName: ListNameService,
              private localStorage: LocalStorageService,
              private store: Store
  ) {
  }

  /* initialState$ = createEffect(() => this.actions$.pipe(
       ofType(KanbanNames.InitialState),
       switchMap(() => this.localStorage.getItem(LOCAL_STORAGE_KEY)),
       tap(el => console.log('el', el))
     ),
     {dispatch: false})*/

  changeLocalStorage$ = createEffect(() => this.actions$.pipe(
      ofType(KanbanNames.AddBoard,
        KanbanNames.EditBoard,
        KanbanNames.MoveTask,
        KanbanNames.EditTask,
        KanbanNames.AddTask,
        KanbanNames.DeleteTask,
        KanbanNames.MoveItemInArray,
        KanbanNames.TransferArrayItem,
        KanbanNames.AddColumns,
        KanbanNames.ChangeTaskSubtaskCheck,
        KanbanNames.ChangeActiveListName
      ),
      tap(el => console.log('effect', el.type)),
      switchMap(() => this.store.select(KanbanSelectors.allState)),
      tap(data => {
        // console.log('effect', data)
        this.localStorage.set(LOCAL_STORAGE_KEY, data)
      })
    ),
    {dispatch: false}
  )


  /*  addBtn$ = createEffect(() => this.actions$.pipe(
      ofType(KanbanNames.AddBoard),
      map((el: any) => el.board.name),
      map((name) => {
          let item: Btn = {
            name: name,
            id: new Date().getTime(),
            class: 'SideNav__tab'
          }
          return BtnActions.addBtn({item})
        }
      )
    ))*/
  /*    addBtn1$ = createEffect(() =>
        this.actions$.pipe(
          ofType(KanbanNames.AddBoard),
          map((action: KanbanActionsType) => action.board),
          map(({board: {name}}) => BtnActions.addBtn({
            item: {
              name,
              id: new Date().getTime(),
              class: 'SideNav__tab'
            }
          }))
        )
      );*/


  /*
    activeLinkBtn$ = createEffect(() => this.actions$.pipe(
        ofType(KanbanNames.ActiveBtn),
        map((el: any) => el.item.name.trim()),
        tap(name => this.listName.changeListName(name)
        )
      ), {
        dispatch: false
      }
    )
  //TODO :write type for action
    changeActiveName$ = createEffect(() => this.actions$.pipe(
      ofType(KanbanNames.ActiveBtn),
      map((el: any) => el.item.name.trim()),
      map((name) => KanbanActions.changeActiveListName({name}))
    ))
  */

  /* changeActiveName1$ = createEffect(() =>
     this.actions$.pipe(
       ofType(KanbanNames.ActiveBtn),
       map(({item: {name}}) => {
         if (typeof name === 'string') {
           name = name.trim()
         }
         return KanbanActions.changeActiveListName({name})
       }))
   )
 );*/

}

/*
changeActiveName$ = createEffect(() =>
  this.actions$.pipe(
    ofType(KanbanNames.ActiveBtn),
    map(({item}) => KanbanActions.changeActiveListName({ name: item.name.trim() }))
  )
);*/

/*
addBtn$ = createEffect(() =>
  this.actions$.pipe(
    ofType(KanbanNames.AddBoard),
    map(({board}) => BtnActions.addBtn({
      item: {
        name: board.name,
        id: new Date().getTime(),
        class: 'SideNav__tab'
      }
    }))
  )
);*/
