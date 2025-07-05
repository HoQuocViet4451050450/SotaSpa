import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ServiceBlogService } from '../../services/service-blog.service';
import { Router } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { ServiceIdEncoderServiceService } from '../../services/service-id-encoder-service.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-page-components',
  templateUrl: './blog-page-components.component.html',
  styleUrls: ['./blog-page-components.component.css'],
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
export class BlogPageComponentsComponent implements OnInit, AfterViewInit {
  formData: any = this.getEmptyForm();
  blogList: any[] = [];
  paginatedBlogList: any[] = [];

  // Phân trang
  currentPage = 1;
  itemsPerPage = 15;
  totalPages = 1;

  constructor(
    private Service: ServiceBlogService,
    private router: Router,
    private el: ElementRef,
    private idEncoderService: ServiceIdEncoderServiceService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.setMetaTags(); // Gọi hàm SEO
    this.loadBlogs();
  }
  setMetaTags(): void {
    this.titleService.setTitle('Blogs Làm Đẹp & Chăm Sóc Da – Sota Spa');
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Khám phá các bài viết chia sẻ kiến thức làm đẹp, chăm sóc da, bí quyết thư giãn và cập nhật xu hướng spa mới nhất từ Sota Spa.',
      },
      {
        name: 'keywords',
        content:
          'Blog Spa, Kiến thức làm đẹp, Chăm sóc da, Massage thư giãn, Bí quyết spa, Tin tức làm đẹp, Sota Spa Blog',
      },
      { name: 'author', content: 'Sota Spa' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Blog Làm Đẹp – Sota Spa' },
      {
        property: 'og:description',
        content:
          'Tổng hợp bài viết chia sẻ kiến thức chăm sóc da, liệu trình spa chuyên sâu và mẹo làm đẹp từ chuyên gia Sota Spa.',
      },
      {
        property: 'og:image',
        content:
          'https://sotaspaofficial.onrender.com/assets/images/LogoNewR.jpg',
      },
      {
        property: 'og:url',
        content: 'https://sotaspaofficial.onrender.com/#/blogPage',
      },
      { property: 'og:type', content: 'website' },
    ]);
  }
  getEmptyForm() {
    return {
      id: null,
      nguoidang: '',
      tieude: '',
      tieudephu: '',
      ngaydang: '',
      luotxem: 0,
      luotthich: 0,
      noidung: '',
      hinhanh: '',
      duonglink: '',
      lienhe: '',
    };
  }

  loadBlogs(): void {
    this.Service.getBlogs().subscribe((data) => {
      this.blogList = data;
      this.totalPages = Math.ceil(this.blogList.length / this.itemsPerPage);
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBlogList = this.blogList.slice(startIndex, endIndex);
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

  onSubmit(): void {}

  likeBlog(blogId: number): void {
    this.Service.likeBlog(blogId).subscribe({
      next: () => {
        // Tăng lượt thích ở phía client ngay sau khi bấm
        const blog = this.blogList.find((b) => b.id === blogId);
        if (blog) {
          blog.luotthich++;
        }
      },
      error: (err) => {
        console.error('Lỗi khi tăng lượt thích:', err);
      },
    });
  }

  goToBlogDetail(id: number) {
    const encodedId = this.idEncoderService.encodeId(id);
    this.router.navigate(['/blogdetail', encodedId]);
  }

  ngAfterViewInit(): void {
    // Nếu không chờ dữ liệu từ API, có thể gọi luôn tại đây:
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
