import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {DialogRef} from "@angular/cdk/dialog";
import {KanbanSelectors} from "../../../../../store/selectors";
import {KanbanActions} from "../../../../../store/actions";
import {EditBoard} from "../../../../../../assets/data/model";

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

export class EditBoardDialogComponent implements OnInit {
  form: FormGroup;
  columnList: IColumn[]
  nameBoard: string

  constructor(private dialog: DialogRef,
              private fb: FormBuilder,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.select(KanbanSelectors.getAllStatusOfColumns).subscribe(data => this.columnList = data)
    this.store.select(KanbanSelectors.titleName).subscribe(data => this.nameBoard = data)
    this.form = this.fb.group({
      name: [this.nameBoard, Validators.required],
      columns: this.fb.array(this.columnList.map(el => this.addColumnFormGroup(el)))
    })

  }

  deleteColumn(i: number) {
    this.columns.removeAt(i)
  }

  addColumn() {

    this.columns.push(this.addColumnFormGroup({
      status: '',
      id: new Date().getTime()
    }))
  }

  onSubmit() {
    if (this.form.valid) {
      let board: EditBoard = {
        name: this.name.value,
        columns: this.columns.value
      }
      this.store.dispatch(KanbanActions.editBoard({board}))
    }

    this.dialog.close()
  }

  disableColumn(value: any): boolean {
    return this.columnList.length > value
  }

  addColumnFormGroup(el: IColumn): FormGroup {
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
}
