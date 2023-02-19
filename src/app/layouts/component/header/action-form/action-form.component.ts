import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddTaskDialogComponent} from "./add-task-dialog/add-task-dialog.component";
import {EditBoardDialogComponent} from "./edit-board-dialog/edit-board-dialog.component";

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ActionFormComponent {

  @Output()
  delete = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(AddTaskDialogComponent);
  }

  deleteBoard() {
    this.delete.emit()
  }

  editDialog() {
    this.dialog.open(EditBoardDialogComponent)
  }
}
