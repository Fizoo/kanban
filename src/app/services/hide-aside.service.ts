import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HideAsideService {
  public hide$=new BehaviorSubject<boolean>(false)

  constructor() { }

  public changeHide(){
    let oldValue=this.hide$.getValue()
    this.hide$.next(!oldValue)
  }
}
