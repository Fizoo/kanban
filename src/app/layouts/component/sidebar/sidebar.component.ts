import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DarkModeService} from 'src/app/services/dark-mode.service';
import {Observable} from "rxjs";
import {HideAsideService} from "../../../services/hide-aside.service";
import {Btn} from "../../../store/reducerBtn";
import {Store} from '@ngrx/store';
import {KanbanSelectors} from "../../../store/selectors";
import {KanbanActions} from "../../../store/actions";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  mode$: Observable<boolean>
  listButton$: Observable<Btn[]>
  btnCount$: Observable<number>

  constructor(private darkService: DarkModeService,
              private hideService: HideAsideService,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.mode$ = this.darkService.darkMode$
    this.listButton$ = this.store.select(KanbanSelectors.getBtnList)
    this.btnCount$ = this.store.select(KanbanSelectors.getBtnListCount)
  }

  toggleMode() {
    this.darkService.toogleMode()
  }

  changeVisible() {
    this.hideService.changeHide()
  }

  changeList(item: Btn) {
    this.store.dispatch(KanbanActions.changeActiveListName({name: item.name}))
  }

}
