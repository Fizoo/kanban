import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleNameService{

  public titleName$=new Subject<string>()

  changeName(item:string){
    this.titleName$.next(item)
  }


}
