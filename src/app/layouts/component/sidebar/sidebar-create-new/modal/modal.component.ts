import {Component} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  columnCount=[1]

  constructor() {}

  addColumns() {
    let len=this.columnCount.length+1
    this.columnCount.push(len)
  }
}
