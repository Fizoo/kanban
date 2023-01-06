import {Component, OnInit} from '@angular/core';
import {DarkModeService} from 'src/app/services/dark-mode.service';
import {Observable} from "rxjs";
import {HideAsideService} from "../../services/hide-aside.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  darkMode:boolean
  isHide:Observable<boolean>

  constructor(private mode:DarkModeService,
              private hideService:HideAsideService,
              ) { }

  ngOnInit(): void {
    this.mode.darkMode$.subscribe(el=>this.darkMode=el)
    this.isHide=this.hideService.hide$
  }

  hideAside() {
    this.hideService.changeHide()
  }
}
