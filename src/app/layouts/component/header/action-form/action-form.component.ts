import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddTaskDialogComponent} from "./add-task-dialog/add-task-dialog.component";

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionFormComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(AddTaskDialogComponent);
  }
}
