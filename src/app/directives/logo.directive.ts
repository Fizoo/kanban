import {ChangeDetectorRef, Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {DarkModeService} from "../services/dark-mode.service";

@Directive({
  selector: '[appLogo]'
})
export class LogoDirective implements OnInit {


  constructor(private el: ElementRef,
              private r: Renderer2,
              private changes: ChangeDetectorRef,
              private mode: DarkModeService
  ) {
  }

  ngOnInit(): void {
    this.mode.darkMode$.subscribe(el => {
      this.setLogo(el)
    })
  }

  private setLogo(isTrue: boolean) {

    if (!isTrue) {
      this.r.setAttribute(this.el.nativeElement, 'src', 'assets/image/logo-light.svg')
    } else {
      this.r.setAttribute(this.el.nativeElement, 'src', 'assets/image/logo-dark.svg')
    }

  }


}
