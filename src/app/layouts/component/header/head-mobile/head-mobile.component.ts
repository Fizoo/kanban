import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {KanbanSelectors} from "../../../../store/selectors";
import {Observable} from "rxjs";
import {KanbanActions} from "../../../../store/actions";
import {Btn} from "../../../../../assets/data/model";
import {DarkModeService} from "../../../../services/dark-mode.service";

@Component({
  selector: 'app-head-mobile',
  templateUrl: './head-mobile.component.html',
  styleUrls: ['./head-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadMobileComponent implements OnInit {

  count$: Observable<number>
  list$: Observable<any>
  mode$: Observable<boolean>

  constructor(private store: Store,
              private darkService: DarkModeService) {
    this.count$ = this.store.select(KanbanSelectors.getBtnListCount)
    this.list$ = this.store.select(KanbanSelectors.getBtnList)
    this.mode$ = this.darkService.darkMode$
  }


  ngOnInit(): void {
  }

  changeList(item: Btn) {
    this.store.dispatch(KanbanActions.changeActiveListName({name: item.name}))
  }

  toggleMode() {
    this.darkService.toogleMode()
  }
}
