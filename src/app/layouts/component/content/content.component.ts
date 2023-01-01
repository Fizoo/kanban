import {Component, OnDestroy, OnInit} from '@angular/core';
import {List, TasksSubtask} from "../../../../assets/data/dataList";
import {ContentService} from 'src/app/services/content.service';
import {Observable, Subscription} from "rxjs";
import {Boards} from "../../../../assets/data/model";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  list$: Observable<List>
  subList: TasksSubtask[]
  checkedSubCount: number
  subLength: number

  aSub: Subscription

  constructor(private contentService: ContentService) {
  }

  ngOnInit(): void {
    this.list$ = this.contentService.contentList$
  }

  /*  drop(event: CdkDragDrop<ListTasks[]>) {
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
    }*/

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  trackByFn(index: number, item: Boards) {
    return item.id
  }


  /* clickDiv(subtask: TasksSubtask[]) {
     this.subList = subtask
     this.checkedSubCount = subtask.filter(el => el.checked).length
     this.subLength = subtask.filter(el => el.checked).length
     this.subLength = subtask.length
   }*/
}
