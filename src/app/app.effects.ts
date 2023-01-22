import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs';
import {BtnActions, KanbanNames} from "./store/actions";
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

  activeLinkBtn$ = createEffect(() => this.actions$.pipe(
      ofType(KanbanNames.ActiveBtn),
      map((el: any) => el.item.name.trim()),
      tap(name => this.listName.changeListName(name)
      )
    ), {
      dispatch: false
    }
  )


}
