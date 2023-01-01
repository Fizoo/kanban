import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-hide',
  templateUrl: './sidebar-hide.component.html',
  styleUrls: ['./sidebar-hide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarHideComponent {
  @Output() show = new EventEmitter();

  changeVisible(){
    this.show.emit()
  }

}
