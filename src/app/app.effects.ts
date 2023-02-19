import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, switchMap, tap} from 'rxjs';
import {KanbanNames} from "./store/actions";
import {LOCAL_STORAGE_KEY, LocalStorageService} from "./services/local-storage.service";
import {Store} from "@ngrx/store";
import {KanbanSelectors} from "./store/selectors";


@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private localStorage: LocalStorageService,
              private store: Store
  ) {
  }

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
      switchMap(() => this.store.select(KanbanSelectors.allState).pipe(
        debounceTime(500)
      )),
      tap(data => {
        this.localStorage.set(LOCAL_STORAGE_KEY, data)
      })
    ),
    {dispatch: false}
  )
}
