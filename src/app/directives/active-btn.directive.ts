import {Directive, HostListener, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {KanbanActions} from "../store/actions";
import {Btn} from "../store/reducerBtn";


@Directive({
  selector: '[appActiveBtn]'
})
export class ActiveBtnDirective {

  @Input('appActiveBtn') item: Btn

  @HostListener('click')
  onClick() {

    // debugger
    //this.store.dispatch(BtnActions.activeBtn({item: this.item}))
    this.store.dispatch(KanbanActions.changeContentList({name: this.item.name}))
  }

  constructor(private store: Store) {
  }

}
