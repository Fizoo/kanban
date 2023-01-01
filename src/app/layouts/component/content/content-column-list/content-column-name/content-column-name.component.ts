import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-content-column-name',
  templateUrl: './content-column-name.component.html',
  styleUrls: ['./content-column-name.component.scss']
})
export class ContentColumnNameComponent {
  @Input() name: string

}
