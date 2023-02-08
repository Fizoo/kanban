import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DarkModeService} from "../../../services/dark-mode.service";
import {Store} from '@ngrx/store';
import {KanbanSelectors} from "../../../store/selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  title$: Observable<string>
  isDark$: Observable<boolean>

  constructor(private mode: DarkModeService,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.isDark$ = this.mode.darkMode$
    this.title$ = this.store.select(KanbanSelectors.titleName)
  }

}
