import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListNameService implements OnInit {

  listName$ = new Subject<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeListName(name: string) {
    console.log(name)
    this.listName$.next(name)
  }


}
