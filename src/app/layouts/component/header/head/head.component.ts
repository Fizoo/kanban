import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MobileResponsiveService} from "../../../../services/mobile-responsive.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadComponent {
  @Input()
  title: string | null

  isMobile: Observable<boolean>


  constructor(private mobile: MobileResponsiveService) {
    this.isMobile = this.mobile.screenSize$
  }


}
