import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Column, ListTasks} from "../../../../../assets/data/dataList";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-content-column-list',
  templateUrl: './content-column-list.component.html',
  styleUrls: ['./content-column-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ContentColumnListComponent {

  @Input() item: Column



  drop(event: CdkDragDrop<ListTasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
