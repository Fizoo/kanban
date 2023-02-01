import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {Columns, Tasks} from "../../../../../assets/data/model";
import {Store} from '@ngrx/store';
import {KanbanActions} from "../../../../store/actions";
import {Observable} from "rxjs";
import {KanbanSelectors} from "../../../../store/selectors";

@Component({
  selector: 'app-content-column-list',
  templateUrl: './content-column-list.component.html',
  styleUrls: ['./content-column-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentColumnListComponent implements OnInit {

  @Input() item: Columns
  @Input() index: number

  isEmptyColumn: boolean;
  count: Observable<number>

  constructor(private store: Store) {
  }


  ngOnInit(): void {
    this.isEmptyColumn = this.item.tasks.length === 0;
    this.count = this.store.select(KanbanSelectors.countOfStatus(this.item))
  }

  isEmptyColumnFn(item: Columns): boolean {
    return !item.tasks.length
  }

  drop(event: CdkDragDrop<Tasks[]>) {

    if (event.previousContainer === event.container) {
      this.store.dispatch(KanbanActions.moveItemInArray({
        column: this.item,
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex
      }))

      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('!===event', event)
      console.log('!===item', this.item)
      this.store.dispatch(KanbanActions.transferArrayItem({
        previousContainer: event.previousContainer.data[0].statusId,
        container: this.item.id,
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex
      }))
      /*transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );*/

    }
  }
}
