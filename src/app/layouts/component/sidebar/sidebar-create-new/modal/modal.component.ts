import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store,
              public dialogRef: MatDialogRef<ModalComponent>) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([this.addFbGroup()])
    })
  }

  addColumns() {
    this.columns.push(this.addFbGroup())
  }

  addFbGroup() {
    return this.fb.group({
      column: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.form.value)
    console.log('ggg')
  }

  delete(i: number) {
    this.columns.removeAt(i)
  }

  resetName() {
    this.name.reset()
  }

  resetColumn(i: number) {
    this.columns.controls[i].reset()
  }

  get name() {
    return this.form.controls['name']
  }

  get columns() {
    return (this.form.controls['columns'] as FormArray)
  }
}
