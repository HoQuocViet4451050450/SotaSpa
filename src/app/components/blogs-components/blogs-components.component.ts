import { Component, OnInit } from '@angular/core';
import { ServiceBlogService } from '../services/service-blog.service';
import { Router } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { ServiceIdEncoderServiceService } from '../services/service-id-encoder-service.service';
@Component({
  selector: 'app-blogs-components',
  templateUrl: './blogs-components.component.html',
  styleUrls: ['./blogs-components.component.scss'],
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
export class BlogsComponentsComponent implements OnInit {
  blogList: any[] = [];

  constructor(
    private Service: ServiceBlogService,
    private router: Router,
    private idEncoderService: ServiceIdEncoderServiceService
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.Service.getBlogs().subscribe((data) => {
      this.blogList = data;
    });
  }

  onSubmit(): void {}

  goToBlogDetail(id: number) {
    const encodedId = this.idEncoderService.encodeId(id);

    this.router.navigate(['/blogdetail', encodedId]);
  }

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
}
