import {ChangeDetectionStrategy,  Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-action-btn-hide',
  templateUrl: './action-btn-hide.component.html',
  styleUrls: ['./action-btn-hide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBtnHideComponent {
  @Input()
  isHide:Observable<boolean>

  @Output()
  changeHide=new EventEmitter<void>();

  changeVisibility(){
    this.changeHide.emit()
  }


}
