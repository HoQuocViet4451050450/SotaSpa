import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ServicePromotionService } from '../services/service-promotion.service';
import { Router } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-promotion-poster-components',
  templateUrl: './promotion-poster-components.component.html',
  styleUrls: ['./promotion-poster-components.component.css'],
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
export class PromotionPosterComponentsComponent
  implements OnInit, AfterViewInit
{
  formData: any = this.getEmptyForm();
  promotionList: any[] = [];
  paginatedPromotionList: any[] = [];

  // Phân trang
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  constructor(
    private Service: ServicePromotionService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  getEmptyForm() {
    return {
      id: null,
      nguoidang: '',
      tieude: '',
      tieudephu: '',
      // ngaydang không có vì tự động tạo ở backend
      ngaybatdau: '',
      ngayhethan: '',
      luotxem: 0,
      luotthich: 0,
      noidung: '',
      hinhanh: '',
      duonglink: '',
      lienhe: '',
    };
  }

  loadPromotions(): void {
    this.Service.getPros().subscribe((data) => {
      this.promotionList = data;
      this.totalPages = Math.ceil(
        this.promotionList.length / this.itemsPerPage
      );
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPromotionList = this.promotionList.slice(
      startIndex,
      endIndex
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  onSubmit(): void {
    // xử lý khi submit nếu có
  }

  likePromotion(promotionId: number): void {
    this.Service.likePro(promotionId).subscribe({
      next: () => {
        const promo = this.promotionList.find((p) => p.id === promotionId);
        if (promo) {
          promo.luotthich++;
        }
      },
      error: (err) => {
        console.error('Lỗi khi tăng lượt thích:', err);
      },
    });
  }

  goToPromotionDetail(id: number) {
    this.router.navigate(['/promotiondetail', id]);
  }

  ngAfterViewInit(): void {
    this.applyScrollAnimations();
  }

  applyScrollAnimations() {
    const elements = this.el.nativeElement.querySelectorAll('.scroll-fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
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
