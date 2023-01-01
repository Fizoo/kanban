import { Pipe, PipeTransform } from '@angular/core';
import {TasksSubtask} from "../../assets/data/dataList";


@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: TasksSubtask[] ): string {
    let one=value.filter(a=>a.checked).length
    let two=value.length
    return `${one} of ${two} subtasks`;
  }

}

