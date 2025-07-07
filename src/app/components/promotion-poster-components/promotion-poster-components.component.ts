import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ServicePromotionService } from '../services/service-promotion.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser'; // ✅ Import SEO

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
    private el: ElementRef,
    private title: Title, // ✅ Inject SEO services
    private meta: Meta // ✅ Inject SEO services
  ) {}

  ngOnInit(): void {
    // ✅ SEO Title + Meta
    this.title.setTitle(
      'Ưu đãi đặc biệt – Sota Spa | Giảm giá các liệu trình làm đẹp'
    );

    this.meta.updateTag({
      name: 'description',
      content:
        'Khuyến mãi tại Sota Spa: Giảm giá đến 50% các liệu trình massage, chăm sóc da và combo thư giãn đặc biệt. Đặt lịch ngay!',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Khuyến mãi Spa, Ưu đãi Sota Spa, Giảm giá Massage, Liệu trình làm đẹp, Combo thư giãn, Sota Spa ưu đãi',
    });

    this.meta.updateTag({ name: 'author', content: 'Sota Spa' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Ưu đãi đặc biệt tại Sota Spa – Giảm giá các liệu trình làm đẹp',
    });

    this.meta.updateTag({
      property: 'og:description',
      content:
        'Sota Spa ưu đãi lớn – Giảm 30-50% cho mọi dịch vụ massage, chăm sóc da, combo liệu trình. Cơ hội làm đẹp tiết kiệm!',
    });

    this.meta.updateTag({
      property: 'og:image',
      content: 'https://hungvietphat.io.vn/assets/images/LogoNewR.jpg',
    });

    this.meta.updateTag({
      property: 'og:url',
      content: 'https://hungvietphat.io.vn/#/promotion',
    });

    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // ✅ Load dữ liệu
    this.loadPromotions();
  }

  getEmptyForm() {
    return {
      id: null,
      nguoidang: '',
      tieude: '',
      tieudephu: '',
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
