import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Btn} from "../../../../store/reducerBtn";

@Component({
  selector: 'app-sidebar-action',
  templateUrl: './sidebar-action.component.html',
  styleUrls: ['./sidebar-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarActionComponent {

  @Input()
  listMenu:Btn[]|null

  @Output()
  changeList=new EventEmitter<Btn>()


  trackByFn(index:number,item:Btn){
      return item.id
  }

  change(item:Btn){
    this.changeList.emit(item)
  }
}
