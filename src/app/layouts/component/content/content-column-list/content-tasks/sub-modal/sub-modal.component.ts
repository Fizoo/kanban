import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Tasks} from "../../../../../../../assets/data/model";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {MatSelectionListChange} from "@angular/material/list";
import {Store} from "@ngrx/store";
import {KanbanActions} from "../../../../../../store/actions";
import {Observable, tap} from "rxjs";
import {KanbanSelectors} from "../../../../../../store/selectors";
import {MatSelectChange} from "@angular/material/select";


@Component({
  selector: 'app-sub-modal',
  templateUrl: './sub-modal.component.html',
  styleUrls: ['./sub-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubModalComponent implements OnInit {

  columnStatus$: Observable<string[]>

  actualColumns: string = ''
  isChanged = false
  oldDate: Tasks


  constructor(public dialogRef: MatDialogRef<SubModalComponent>,
              @Inject(DIALOG_DATA) public data: Tasks,
              private store: Store,
              private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.columnStatus$ = this.store.select(KanbanSelectors.getColumnStatusById(this.data.statusId))
      .pipe(tap(() => {
        this.actualColumns = this.data.status
      }))
    this.oldDate = this.data

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
  }

  deleteTask() {
    this.store.dispatch(KanbanActions.deleteTask({task: this.data}))
    this.dialogRef.close()
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  move({value}: MatSelectChange) {
    let oldStatus = this.data.status
    let statusNew = this.actualColumns
    this.store.dispatch(KanbanActions.moveTaskByStatus({
      task: this.data,
      newStatus: statusNew,
      oldStatus: oldStatus
    }))
    this.changeDetector.detectChanges()

  }

  submit() {
    this.store.dispatch(KanbanActions.changeTaskSubtaskCheck({task: this.data}))

    this.changeDetector.detectChanges()
    this.dialogRef.close()
  }
}



