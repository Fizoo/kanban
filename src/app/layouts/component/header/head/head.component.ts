import {ChangeDetectionStrategy, Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadComponent {
  @Input()
  title: string | null

  isMobile: boolean = false

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 750;
  }
}
