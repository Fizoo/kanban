import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeadComponent {
@Input()
  title:string

}
