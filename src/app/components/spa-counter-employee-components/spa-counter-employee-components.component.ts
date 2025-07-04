import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spa-counter-employee-components',
  templateUrl: './spa-counter-employee-components.component.html',
  styleUrls: ['./spa-counter-employee-components.component.css'],
})
export class SpaCounterEmployeeComponentsComponent {
  employee = 0;
  room = 0;
  reputationPercent = 0;
  year = 0;
  counted = false;

  @ViewChild('statsGrid', { static: true }) statsGrid!: ElementRef;

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.counted) {
          this.counted = true;
          this.animateCount('employee', 50, 50);
          this.animateCount('room', 15, 60);
          this.animateCount('year', 5, 80);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(this.statsGrid.nativeElement);
  }

  animateCount(
    property: 'employee' | 'room' | 'year',
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
