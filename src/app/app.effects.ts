import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs';
import {BtnActions, KanbanNames} from "./store/actions";
import {Btn} from "./store/reducerBtn";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {
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
}
