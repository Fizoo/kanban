import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from '@ngrx/store';
import {Tasks} from "../../../../../../assets/data/model";
import {Observable} from "rxjs";
import {KanbanSelectors} from "../../../../../store/selectors";
import {KanbanActions} from "../../../../../store/actions";
import {DialogRef} from "@angular/cdk/dialog";

interface Status {
  status: string
  id: number
}

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddTaskDialogComponent implements OnInit {
  form: FormGroup
  statusList: Observable<Array<Status>>

  constructor(private fb: FormBuilder,
              private store: Store,
              private dialog: DialogRef
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      subtasks: this.fb.array([])
    })

    this.statusList = this.store.select(KanbanSelectors.getAllStatusOfColumns)
  }


  deleteSub(i: number) {
    this.subtasks.removeAt(i)
  }

  addSub() {
    this.subtasks.push(this.fb.group({
      sub: ['', Validators.required]
    }))
  }

  submit(event: any) {

    let newTask: Tasks = {
      ...this.form.value,
      id: new Date().getTime(),
      status: this.form.value.status.status,
      statusId: this.form.value.status.id,
      subtasks: this.form.value.subtasks.map((s: any) => ({
        title: s.sub,
        isCompleted: false
      }))
    }
    this.store.dispatch(KanbanActions.addTask({task: newTask}))
    this.dialog.close()
  }

  get subtasks() {
    return (this.form.controls['subtasks'] as FormArray)
  }

  get title() {
    return this.form.controls['title']
  }


}
