import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { ServiceMenuService } from '../services/service-menu.service';
@Component({
  selector: 'app-menu-components',
  templateUrl: './menu-components.component.html',
  styleUrls: ['./menu-components.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class MenuComponentsComponent implements OnInit, AfterViewInit {
  dichvus: any[] = [];
  paginatedDichvus: any[] = []; // Dịch vụ hiển thị theo trang
  currentPage: number = 1;
  pageSize: number = 12; // 3 hàng, mỗi hàng 4 dịch vụ

  constructor(
    private el: ElementRef,
    private serviceMenu: ServiceMenuService
  ) {}

  ngOnInit(): void {
    this.loadDichVu();
  }

  loadDichVu(): void {
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
      this.setPage(1); // Load trang đầu tiên
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDichvus = this.dichvus.slice(startIndex, endIndex);
  }

  totalPages(): number {
    return Math.ceil(this.dichvus.length / this.pageSize);
  }

  ngAfterViewInit(): void {
    this.applyScrollAnimations();
  }

  applyScrollAnimations(): void {
    const elements = this.el.nativeElement.querySelectorAll('.scroll-fade-in');
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el: Element) => observer.observe(el));
  }
}
