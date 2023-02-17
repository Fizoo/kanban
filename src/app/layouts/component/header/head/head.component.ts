import {ChangeDetectionStrategy, Component, HostListener, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HideAsideService} from "../../../../services/hide-aside.service";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadComponent {
  @Input()
  title: string | null

  isMobile: boolean = false

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 750;
  }

  constructor(private dialog: MatDialog,
              private hideService: HideAsideService) {
  }


}
