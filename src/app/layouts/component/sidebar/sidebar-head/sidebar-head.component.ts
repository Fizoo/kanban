import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ButtonsList} from "../../../../../assets/data/buttons";

@Component({
  selector: 'app-sidebar-head',
  templateUrl: './sidebar-head.component.html',
  styleUrls: ['./sidebar-head.component.scss'],
  //changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidebarHeadComponent {

  @Input()
  menu:ButtonsList[]

}
