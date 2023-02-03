import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddNewColumnDialogComponent} from "./add-new-column-dialog/add-new-column-dialog.component";

@Component({
  selector: 'app-column-create',
  templateUrl: './column-create.component.html',
  styleUrls: ['./column-create.component.scss']
})
export class ColumnCreateComponent {


  constructor(private dialog: MatDialog) {
  }


  addNewColumn() {
    this.dialog.open(AddNewColumnDialogComponent)
  }
}
