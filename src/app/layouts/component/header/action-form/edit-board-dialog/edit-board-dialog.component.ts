import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {DialogRef} from "@angular/cdk/dialog";
import {KanbanSelectors} from "../../../../../store/selectors";
import {KanbanActions} from "../../../../../store/actions";
import {Columns, EditBoard} from "../../../../../../assets/data/model";
import {of, Subject, switchMap, takeUntil} from "rxjs";

interface IColumn {
  status: string
  id: number
}

@Component({
  selector: 'app-edit-board-dialog',
  templateUrl: './edit-board-dialog.component.html',
  styleUrls: ['./edit-board-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class EditBoardDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  columnList: IColumn[] = []
  nameBoard: string = ''
  count: number = 0
  private unsubscribe$ = new Subject<void>()

  constructor(private dialog: DialogRef,
              private fb: FormBuilder,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(KanbanSelectors.getAllStatusOfColumns)
      .pipe(takeUntil(this.unsubscribe$)).subscribe(data => this.columnList = data)

    this.store.select(KanbanSelectors.getTitleName)
      .pipe(takeUntil(this.unsubscribe$)).subscribe(data => this.nameBoard = data)

    this.form = this.fb.group({
      name: [this.nameBoard, Validators.required],
      columns: this.fb.array(this.columnList.map(el => this.createColumnFormGroup(el)))
    })

  }

  deleteColumn(i: number) {
    this.columns.removeAt(i)
  }

  addColumn() {
    this.columns.push(this.createColumnFormGroup({
      status: '',
      id: new Date().getTime()
    }))
  }

  onSubmit() {
    if (this.form.valid) {
      const board: EditBoard = {
        name: this.name.value,
        columns: this.columns.value
      }
      this.store.dispatch(KanbanActions.editBoard({board}))
    }
    this.dialog.close()
  }

  disableColumn(i: number): boolean {
    const status = this.columns.controls[i].value;
    const item: Columns = {
      name: status.name,
      id: status.id,
      tasks: []
    };

    this.store.select(KanbanSelectors.getCountOfStatus(item)).pipe(
      switchMap(count => of(count)),
      takeUntil(this.unsubscribe$)
    ).subscribe(count => this.count = count);

    return this.count > 0;
  }

  createColumnFormGroup(el: IColumn): FormGroup {
    return this.fb.group({
      column: [el.status, Validators.required],
      id: [el.id]
    });
  }

  get columns() {
    return (this.form.controls['columns'] as FormArray)
  }

  get name() {
    return this.form.controls['name']
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
