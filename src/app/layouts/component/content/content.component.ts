import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Columns} from "../../../../assets/data/model";
import {Store} from "@ngrx/store";
import {KanbanSelectors} from "../../../store/selectors";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {

  @Input()
  activeName: string


  list$: Observable<Columns[]>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.list$ = this.store.select(KanbanSelectors.getActualList)
  }

  trackByFn(index: number, item: Columns) {
    return item.id
  }
}
