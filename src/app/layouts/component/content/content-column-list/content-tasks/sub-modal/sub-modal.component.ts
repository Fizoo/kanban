import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Tasks} from "../../../../../../../assets/data/model";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {MatSelectionListChange} from "@angular/material/list";
import {Store} from "@ngrx/store";
import {KanbanActions} from "../../../../../../store/actions";
import {Observable, tap} from "rxjs";
import {BtnSelectors, KanbanSelectors} from "../../../../../../store/selectors";
import {MatSelectChange} from "@angular/material/select";
import {EditTaskDialogComponent} from "./edit-task-dialog/edit-task-dialog.component";


@Component({
  selector: 'app-sub-modal',
  templateUrl: './sub-modal.component.html',
  styleUrls: ['./sub-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubModalComponent implements OnInit {

  columnStatus$: Observable<string[]>
  actualList: string
  actualColumns: string = ''
  isChanged = false
  oldDate: Tasks


  constructor(public dialogRef: MatDialogRef<SubModalComponent>,
              @Inject(DIALOG_DATA) public data: Tasks,
              private store: Store,
              private changeDetector: ChangeDetectorRef,
              public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.columnStatus$ = this.store.select(KanbanSelectors.getColumnStatusById(this.data.statusId))
      .pipe(tap(() => {
        this.actualColumns = this.data.status
      }))
    this.oldDate = this.data

    this.store.select(BtnSelectors.activeName).subscribe((el) => this.actualList = el)


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
      oldStatus: oldStatus,
      activeList: this.actualList
    }))
    this.dialogRef.close()

  }

  submit() {
    if (this.isChange()) {
      this.store.dispatch(KanbanActions.changeTaskSubtaskCheck({task: this.data}))
    }
    this.dialogRef.close()
  }

  isChange(): boolean {
    return !this.data.subtasks.every((el, i) => this.oldDate.subtasks.map(a => a.isCompleted)[i] === el.isCompleted)

  }

  editTaskModel(data: Tasks) {
    this.dialog.open(EditTaskDialogComponent,
      {
        data: data
      })
    this.dialogRef.close()
  }
}



