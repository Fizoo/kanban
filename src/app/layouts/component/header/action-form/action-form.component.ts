import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddTaskDialogComponent} from "./add-task-dialog/add-task-dialog.component";
import {Store} from "@ngrx/store";
import {KanbanActions} from "../../../../store/actions";
import {EditBoardDialogComponent} from "./edit-board-dialog/edit-board-dialog.component";

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ActionFormComponent {

  constructor(public dialog: MatDialog,
              private store: Store,
  ) {
  }

  openDialog() {
    this.dialog.open(AddTaskDialogComponent);
  }

  deleteBoard() {
    this.store.dispatch(KanbanActions.deleteBoard())
  }

  editDialog() {
    this.dialog.open(EditBoardDialogComponent)
  }
}
