import {Component, Input} from '@angular/core';
import {Subtask} from "../../../../../../../assets/data/model";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {
  @Input() subList:Subtask[]

}
