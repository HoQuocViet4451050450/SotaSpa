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
import { Title, Meta } from '@angular/platform-browser';

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
    private serviceMenu: ServiceMenuService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.loadDichVu();
    this.setSEO();
  }
  setSEO(): void {
    this.titleService.setTitle('Dịch Vụ Spa Chuyên Nghiệp – Sota Spa & Beauty');

    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Khám phá các dịch vụ spa chuyên nghiệp tại Sota Spa: massage thư giãn, chăm sóc da, trị liệu cơ thể và liệu trình cao cấp.',
      },
      {
        name: 'keywords',
        content:
          'Dịch vụ Spa, Massage thư giãn, Chăm sóc da, Liệu trình trị liệu, Spa chuyên nghiệp, Sota Spa, Làm đẹp, Thải độc da, Combo chăm sóc cơ thể',
      },
      { name: 'author', content: 'Sota Spa' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph (OG)
      { property: 'og:title', content: 'Dịch Vụ Làm Đẹp – Sota Spa & Beauty' },
      {
        property: 'og:description',
        content:
          'Sota Spa mang đến các dịch vụ làm đẹp chuyên nghiệp: chăm sóc da, massage, trị liệu thư giãn, thải độc và nhiều combo đặc biệt.',
      },
      {
        property: 'og:image',
        content: 'https://hungvietphat.io.vn/assets/images/LogoNewR.jpg',
      },
      {
        property: 'og:url',
        content: 'https://hungvietphat.io.vn/#/menu',
      },
      { property: 'og:type', content: 'website' },
    ]);
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
