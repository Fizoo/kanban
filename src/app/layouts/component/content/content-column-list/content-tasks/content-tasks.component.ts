import {Component, Input} from '@angular/core';
import {Tasks} from "../../../../../../assets/data/model";
import {MatDialog} from "@angular/material/dialog";
import {SubModalComponent} from "./sub-modal/sub-modal.component";


@Component({
  selector: 'app-content-tasks',
  templateUrl: './content-tasks.component.html',
  styleUrls: ['./content-tasks.component.scss']
})
export class ContentTasksComponent {

  @Input() el: Tasks

  constructor(public dialog: MatDialog) {
  }

  clickDiv(el: Tasks) {
    this.dialog.open(SubModalComponent, {
      data: el
    });

  }
}

