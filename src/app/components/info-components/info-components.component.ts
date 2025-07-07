import {
  Component,
  AfterViewInit,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-info-components',
  templateUrl: './info-components.component.html',
  styleUrls: ['./info-components.component.scss'],
})
export class InfoComponentsComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.scroll-fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((el: Element) => observer.observe(el));
  }
}
