import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-dark-mode',
  templateUrl: './sidebar-dark-mode.component.html',
  styleUrls: ['./sidebar-dark-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarDarkModeComponent {
  @Input()
  mode: boolean | null

  @Output()
  modeFn=new EventEmitter<void>()

  toggleMode() {
    this.modeFn.emit()
  }


}
