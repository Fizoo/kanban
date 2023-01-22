import {Component, Input, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {Columns} from "../../../../assets/data/model";
import {Store} from "@ngrx/store";
import {BtnSelectors, KanbanSelectors} from "../../../store/selectors";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input()
  activeName: string


  list$: Observable<Columns[]>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.list$ = this.store.select(BtnSelectors.activeName)
      .pipe(
        switchMap(el => this.store.select(KanbanSelectors.getContentList(el))),
      )
  }

  trackByFn(index: number, item: Columns) {
    return item.id
  }
}
