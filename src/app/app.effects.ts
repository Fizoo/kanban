import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs';
import {BtnActions, KanbanActions, KanbanNames} from "./store/actions";
import {Btn} from "./store/reducerBtn";
import {ListNameService} from "./services/list-name.service";


@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private listName: ListNameService) {
  }

  addBtn$ = createEffect(() => this.actions$.pipe(
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
  ))
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
