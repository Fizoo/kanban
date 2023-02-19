import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Subtask} from "../../../../../../../assets/data/model";

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentCardComponent {
  @Input() task: string
  @Input() subtask: Subtask[]

}
