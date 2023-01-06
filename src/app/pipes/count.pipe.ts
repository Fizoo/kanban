import {Pipe, PipeTransform} from '@angular/core';
import {Subtask} from "../../assets/data/model";


@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: Subtask[] ): string {
    let one=value.filter(a=>a.isCompleted).length
    let two=value.length
    return `${one} of ${two} subtasks`;
  }

}

