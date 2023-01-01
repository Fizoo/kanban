import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TitleNameService} from "../../../services/title-name.service";
import {buttonsList} from "../../../../assets/data/buttons";
import {DarkModeService} from "../../../services/dark-mode.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  title:string=buttonsList[0].name  //TODO: use title with async or ngrx

  aSub:Subscription
  isDark$:Observable<boolean>

  constructor(private titleService: TitleNameService,
              private mode:DarkModeService) { }

  ngOnInit(): void {
    //this.aSub=this.titleService.titleName$.subscribe(el=>this.title=el)
    this.isDark$=this.mode.darkMode$
  }


}
