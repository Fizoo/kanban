import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TitleNameService} from "../../../services/title-name.service";
import {DarkModeService} from "../../../services/dark-mode.service";
import {Store} from '@ngrx/store';
import {BtnSelectors} from "../../../store/selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  title$:Observable<string>
  isDark$:Observable<boolean>

  constructor(private titleService: TitleNameService,
              private mode:DarkModeService,
              private store:Store
              ) { }

  ngOnInit(): void {
    this.isDark$=this.mode.darkMode$
    this.title$=this.store.select(BtnSelectors.activeName)
  }


}
