import {Directive, HostListener, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {Btn} from "../../assets/data/model";


@Directive({
  selector: '[appActiveBtn]'
})
export class ActiveBtnDirective {

  @Input('appActiveBtn') item: Btn

  @HostListener('click')
  onClick() {

    // debugger
    //this.store.dispatch(BtnActions.activeBtn({item: this.item}))
    //this.store.dispatch(KanbanActions.changeActiveListName({name: this.item.name}))
  }

  constructor(private store: Store) {
  }

}
