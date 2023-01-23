import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {Subtask, Tasks} from "../../../../../../../../assets/data/model";
import {Store} from "@ngrx/store";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {KanbanSelectors} from "../../../../../../../store/selectors";
import {KanbanActions} from "../../../../../../../store/actions";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTaskDialogComponent implements OnInit {

  form: FormGroup;
  columnStatus$: Observable<string[]>;

  newStatusId: number = this.data.statusId
  oldStatus = this.data.status

  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>,
              @Inject(DIALOG_DATA) public data: Tasks,
              private store: Store,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      status: [this.data.status],
      subtasks: this.formBuilder.array([...this.data.subtasks.map((el) => this.addSkillFormGroup(el))]),
    })

    this.columnStatus$ = this.store.select(KanbanSelectors.getColumnStatusById)

    /* this.status?.valueChanges.pipe(
       tap(el => console.log('tap', el)),
       map(el => this.store.dispatch(KanbanActions.moveTaskByStatus({
         task: this.data,
         newStatus: el,
         oldStatus: this.oldStatus
       })))
       // switchMap(el => this.store.select(KanbanSelectors.getStatusIdAfterChange(el)))
     ).subscribe()*/
  }

  addSkillFormGroup(el?: Subtask): FormGroup {
    return this.formBuilder.group({
      title: [el?.title, Validators.required],
      isCompleted: [el?.isCompleted || false]
    });
  }

  onSubmit() {

    let task: Tasks = {
      ...this.form.value,
      id: this.data.id,
      statusId: this.newStatusId
    }

    this.store.dispatch(KanbanActions.editTask({task}))

    if (this.status?.value !== this.oldStatus) {
      this.store.dispatch(KanbanActions.moveTaskByStatus({
        task: task,
        newStatus: this.status?.value,
        oldStatus: this.oldStatus
      }))
    }

    this.dialogRef.close()
  }

  deleteSub(i: number) {
    this.subtasks.removeAt(i)
  }

  addSub() {
    this.subtasks.push(this.addSkillFormGroup())
  }

  get status() {
    return this.form.get('status');
  }

  get subtasks() {
    return (this.form.controls['subtasks'] as FormArray)
  }

  get title() {
    return this.form.controls['title']
  }
}
