import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  public darkMode$=new BehaviorSubject<boolean>(false);

  constructor() { }

  toogleMode(): void {
    let temp=this.darkMode$.getValue()
    this.darkMode$.next(!temp)
  }
}
