import {
  Component,
  AfterViewInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ServiceMenuService } from '../services/service-menu.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-horizontal-menu-components',
  templateUrl: './horizontal-menu-components.component.html',
  styleUrls: ['./horizontal-menu-components.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HorizontalMenuComponentsComponent implements AfterViewInit {
  dichvus: any[] = [];
  groupedDichvus: any[][] = [];
  currentPage = 0;
  constructor(
    private serviceMenu: ServiceMenuService,
    private el: ElementRef
  ) {}

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

  ngOnInit(): void {
    this.serviceMenu.getAll().subscribe((res) => {
      const grouped: any = {};
      res.forEach((item) => {
        if (!grouped[item.dichvu_id]) {
          grouped[item.dichvu_id] = {
            id: item.dichvu_id,
            tendichvu: item.tendichvu,
            mota: item.mota,
            gois: [],
          };
        }
        if (item.goi_id) {
          grouped[item.dichvu_id].gois.push({
            id: item.goi_id,
            tengoi: item.tengoi,
            solan: item.solan,
            gia: item.gia,
          });
        }
      });

      this.dichvus = Object.values(grouped);
      this.groupedDichvus = this.chunkArray(this.dichvus, 4); // nhóm 4 dịch vụ mỗi trang
    });
  }
  chunkArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
  nextPage() {
    if (this.currentPage < this.groupedDichvus.length - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
