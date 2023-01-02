import {Directive, HostListener, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {BtnActions} from "../store/actions";
import {Btn} from "../store/reducerBtn";


@Directive({
  selector: '[appActiveBtn]'
})
export class ActiveBtnDirective {

  @Input('appActiveBtn') item:Btn

  @HostListener('click')
  onClick(){
    this.store.dispatch(BtnActions.activeBtn({item: this.item}))
  }

  constructor(private store:Store) { }

}
