import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {Store} from "@ngrx/store";
import {KanbanSelectors} from "../../../../../store/selectors";
import {KanbanActions} from "../../../../../store/actions";
import {Observable} from "rxjs";

interface Column {
  status: string;
  id: number
}

@Component({
  selector: 'app-add-new-column-dialog',
  templateUrl: './add-new-column-dialog.component.html',
  styleUrls: ['./add-new-column-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewColumnDialogComponent implements OnInit {
  form: FormGroup;
  columnList: Column[]
  titleName: Observable<string>;

  constructor(private dialog: DialogRef,
              private fb: FormBuilder,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.select(KanbanSelectors.getAllStatusOfColumns).subscribe(data => this.columnList = data)
    this.titleName = this.store.select(KanbanSelectors.getTitleName)
    this.form = this.fb.group({
      columns: this.fb.array(this.columnList.map(el => this.addColumnFormGroup(el)))
    })

  }

  deleteColumn(i: number) {
    this.column.removeAt(i)
  }

  addColumn() {

    this.column.push(this.addColumnFormGroup({
      status: '',
      id: new Date().getTime()
    }))
  }

  onSubmit() {
    if (this.form.valid) {
      let x = this.form.value
      this.store.dispatch(KanbanActions.addColumn({column: x.columns}))
    }
  }

  get column() {
    return (this.form.controls['columns'] as FormArray)
  }

  disableColumn(value: number): boolean {
    return this.columnList.length > value
  }

  addColumnFormGroup(el: Column): FormGroup {
    return this.fb.group({
      column: [el.status, Validators.required],
      id: [el.id]
    });
  }
}
