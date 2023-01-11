import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appChecked]'
})
export class CheckedDirective implements OnInit {
  @Input('appChecked') check: boolean

  constructor(private el: ElementRef,
              private r: Renderer2) {
  }

  ngOnInit(): void {
    if (this.check) {
      this.r.setStyle(this.el.nativeElement, 'textDecoration', 'line-through');
      this.r.setStyle(this.el.nativeElement, 'opacity', '0.5');
    }
  }

}
