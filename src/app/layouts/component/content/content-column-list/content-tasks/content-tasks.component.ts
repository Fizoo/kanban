import {Component, Input} from '@angular/core';
import {ListTasks, TasksSubtask} from "../../../../../../assets/data/dataList";

@Component({
  selector: 'app-content-tasks',
  templateUrl: './content-tasks.component.html',
  styleUrls: ['./content-tasks.component.scss']
})
export class ContentTasksComponent {
@Input() el:ListTasks

  subList: TasksSubtask[]
  checkedSubCount: number
  subLength: number

  clickDiv(subtask: TasksSubtask[]) {
    this.subList = subtask
    this.checkedSubCount = subtask.filter(el => el.checked).length
    this.subLength = subtask.filter(el => el.checked).length
    this.subLength = subtask.length
  }
}

