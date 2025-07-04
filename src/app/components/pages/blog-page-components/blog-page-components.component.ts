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
    private idEncoderService: ServiceIdEncoderServiceService
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
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
