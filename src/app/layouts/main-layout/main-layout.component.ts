import {Component, OnDestroy, OnInit} from '@angular/core';
import {DarkModeService} from 'src/app/services/dark-mode.service';
import {Observable, Subject, takeUntil} from "rxjs";
import {HideAsideService} from "../../services/hide-aside.service";
import {Store} from "@ngrx/store";
import {KanbanActions} from "../../store/actions";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  darkMode: boolean
  isHide: Observable<boolean>
  private unsubscribe$ = new Subject<void>()

  constructor(private mode: DarkModeService,
              private hideService: HideAsideService,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(KanbanActions.initial())

    this.mode.darkMode$.pipe(takeUntil(this.unsubscribe$)).subscribe(el => this.darkMode = el)
    this.isHide = this.hideService.hide$
  }

  hideAside() {
    this.hideService.changeHide()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
