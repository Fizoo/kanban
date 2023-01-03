import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from "./modal/modal.component";

@Component({
  selector: 'app-sidebar-create-new',
  templateUrl: './sidebar-create-new.component.html',
  styleUrls: ['./sidebar-create-new.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidebarCreateNewComponent {

  constructor(public dialog: MatDialog){}

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      maxWidth: '600px',
    });
  }

}
