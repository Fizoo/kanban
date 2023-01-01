import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {list, List} from "../../assets/data/dataList";

@Injectable({
  providedIn: 'root'
})
export class ContentService {


  private database:List=list

  private _contentList$=new BehaviorSubject<List>(this.database)

  readonly contentList$=this._contentList$.asObservable()

  constructor() { }

  changeList(value:List){
    this._contentList$.next(value)
  }



}
