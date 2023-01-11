import {Component, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Tasks} from "../../../../../../../assets/data/model";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {MatSelectionListChange} from "@angular/material/list";
import {Store} from "@ngrx/store";
import {KanbanActions} from "../../../../../../store/actions";

@Component({
  selector: 'app-sub-modal',
  templateUrl: './sub-modal.component.html',
  styleUrls: ['./sub-modal.component.scss']
})
export class SubModalComponent {

  constructor(public dialogRef: MatDialogRef<SubModalComponent>,
              @Inject(DIALOG_DATA) public data: Tasks,
              private store: Store
  ) {
  }

  closed() {
    this.dialogRef.close()
  }

  select(item: Tasks) {
    console.log(item)
  }

  onChange(change: MatSelectionListChange) {
    this.data = {
      ...this.data,
      subtasks: [...this.data.subtasks].map(el => {
        if (el.title === change.options[0].value.title) {
          el = {
            ...el,
            isCompleted: !el.isCompleted
          }
        }
        return el
      })
    }
    console.log('options=', change.options[0].value)
  }

  deleteTask() {
    this.store.dispatch(KanbanActions.deleteTask({task: this.data}))
    this.dialogRef.close()
  }
}
