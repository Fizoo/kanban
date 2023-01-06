import {Component, Input} from '@angular/core';
import {Subtask, Tasks} from "../../../../../../assets/data/model";


@Component({
  selector: 'app-content-tasks',
  templateUrl: './content-tasks.component.html',
  styleUrls: ['./content-tasks.component.scss']
})
export class ContentTasksComponent {
@Input() el:Tasks

  subList: Subtask[]
  checkedSubCount: number
  subLength: number

  clickDiv(subtask: Subtask[]) {
    this.subList = subtask
    this.checkedSubCount = subtask.filter(el => el.isCompleted).length
    this.subLength = subtask.filter(el => el.isCompleted).length
    this.subLength = subtask.length
  }
}

