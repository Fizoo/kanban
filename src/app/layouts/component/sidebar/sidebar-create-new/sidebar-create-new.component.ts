import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from "./modal/modal.component";

@Component({
  selector: 'app-sidebar-create-new',
  templateUrl: './sidebar-create-new.component.html',
  styleUrls: ['./sidebar-create-new.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidebarCreateNewComponent {
  @Output() createNew = new EventEmitter<void>();

  constructor(public dialog: MatDialog){}

  addButton() {
    this.createNew.emit()
  }

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      maxWidth: '500px',
    });
  }

}
