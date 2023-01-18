import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {Subtask, Tasks} from "../../../../../../../../assets/data/model";
import {Store} from "@ngrx/store";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {KanbanSelectors} from "../../../../../../../store/selectors";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTaskDialogComponent implements OnInit {

  form: FormGroup;
  columnStatus$: Observable<string[]>;

  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>,
              @Inject(DIALOG_DATA) public data: Tasks,
              private store: Store,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      columns: [this.data.status],
      subTasks: this.formBuilder.array([...this.data.subtasks.map((el) => this.addSkillFormGroup(el))]),
    })

    this.columnStatus$ = this.store.select(KanbanSelectors.getColumnStatusById(this.data.statusId))

  }

  addSkillFormGroup(el?: Subtask): FormGroup {
    return this.formBuilder.group({
      title: [el?.title, Validators.required],
      isCompleted: [el?.isCompleted || false]
    });
  }

  get columns() {
    return this.form.get('columns');
  }

  get subTasks() {
    return (this.form.controls['subTasks'] as FormArray)
  }

  onSubmit() {
    console.log(this.form.value)
    console.log(this.form)
  }

  deleteSub(i: number) {
    this.subTasks.removeAt(i)
  }

  addSub() {
    this.subTasks.push(this.addSkillFormGroup())
  }
}
