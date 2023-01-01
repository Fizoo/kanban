import {Component, Input} from '@angular/core';
import {TasksSubtask} from "../../../../../../../assets/data/dataList";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {
  @Input() subList: TasksSubtask[]

}
