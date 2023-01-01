import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-create-new',
  templateUrl: './sidebar-create-new.component.html',
  styleUrls: ['./sidebar-create-new.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidebarCreateNewComponent {
  @Output() createNew = new EventEmitter<void>();

  addButton() {
    this.createNew.emit()
  }
}
