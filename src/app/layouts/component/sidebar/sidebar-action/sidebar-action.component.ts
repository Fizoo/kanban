import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonsList} from "../../../../../assets/data/buttons";

@Component({
  selector: 'app-sidebar-action',
  templateUrl: './sidebar-action.component.html',
  styleUrls: ['./sidebar-action.component.scss']
})
export class SidebarActionComponent {

  @Input()
  listMenu:ButtonsList[]

  @Output()
  activeMenu=new EventEmitter<ButtonsList>()


  activeButton(item: ButtonsList) {
    this.activeMenu.emit(item);
  }

  trackByFn(index:number,item:ButtonsList){
      return item.id
  }
}
