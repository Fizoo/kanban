import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MobileResponsiveService {
  private screenSizeSource$ = new BehaviorSubject<boolean>(false);
  screenSize$ = this.screenSizeSource$.asObservable();

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  changeResponsive(value: boolean) {
    this.screenSizeSource$.next(value)
  }

  private checkScreenSize() {
    this.screenSizeSource$.next(window.innerWidth < 768);
  }
}
