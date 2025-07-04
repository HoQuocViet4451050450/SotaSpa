import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spa-counter-components',
  templateUrl: './spa-counter-components.component.html',
  styleUrls: ['./spa-counter-components.component.css'],
})
export class SpaCounterComponentsComponent implements OnInit {
  userCount = 0;
  happyCustomerCount = 0;
  reputationPercent = 0;
  services = 0;
  counted = false;

  @ViewChild('statsGrid', { static: true }) statsGrid!: ElementRef;

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.counted) {
          this.counted = true;
          this.animateCount('userCount', 120, 50);
          this.animateCount('happyCustomerCount', 110, 60);
          this.animateCount('reputationPercent', 90, 80);
          this.animateCount('services', 30, 70);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(this.statsGrid.nativeElement);
  }

  animateCount(
    property:
      | 'userCount'
      | 'happyCustomerCount'
      | 'reputationPercent'
      | 'services',
    target: number,
    speed: number
  ) {
    const interval = setInterval(() => {
      if (this[property] < target) {
        this[property]++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }
}
