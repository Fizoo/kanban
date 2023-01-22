import {Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {BtnSelectors} from "../store/selectors";

@Injectable({
  providedIn: 'root'
})
export class ListNameService implements OnInit {

  listName$ = new Subject<string>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(BtnSelectors.activeName)
      .subscribe(el => this.listName$.next(el))
  }

  changeListName(name: string) {
    console.log(name)
    this.listName$.next(name)
  }


}
