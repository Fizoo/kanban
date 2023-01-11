import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Columns, Tasks} from "../../../../../assets/data/model";

@Component({
  selector: 'app-content-column-list',
  templateUrl: './content-column-list.component.html',
  styleUrls: ['./content-column-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentColumnListComponent implements OnInit {

  @Input() item: Columns

  @Input()
  index: number

  isEmptyColumn: boolean;

  ngOnInit(): void {
    this.isEmptyColumn = this.item.tasks.length === 0;
  }

  isEmptyColumnFn(item: Columns): boolean {
    return !item.tasks.length
  }

  drop(event: CdkDragDrop<Tasks[]>) {
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
