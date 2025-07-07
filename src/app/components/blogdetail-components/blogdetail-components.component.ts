import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router for potential redirection
import { HttpClient } from '@angular/common/http'; // Keep if ServiceBlogService uses it internally
import { ServiceBlogService } from '../services/service-blog.service';
import { ServiceIdEncoderServiceService } from '../services/service-id-encoder-service.service';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { switchMap } from 'rxjs/operators'; // Import switchMap for reactive routing
import { of } from 'rxjs'; // <--- Ensure 'of' is imported correctly from rxjs

@Component({
  selector: 'app-blogdetail-components',
  templateUrl: './blogdetail-components.component.html',
  styleUrls: ['./blogdetail-components.component.css'],
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
export class BlogdetailComponentsComponent implements OnInit {
  blog: any;
  isLoading: boolean = true; // Add a loading state

  constructor(
    private Service: ServiceBlogService,
    private route: ActivatedRoute,
    private http: HttpClient, // Keep if your ServiceBlogService uses HttpClient directly
    private idEncoderService: ServiceIdEncoderServiceService, // <--- Inject the IdEncoderService
    private router: Router // <--- Inject Router for error handling/redirection
  ) {}

  ngOnInit() {
    const encodedId = this.route.snapshot.paramMap.get('id');
    if (encodedId) {
      const originalId = this.idEncoderService.decodeId(encodedId);
      if (originalId !== null) {
        this.Service.getBlogDetail(originalId);
      } else {
        // Xử lý lỗi: id không hợp lệ
      }
    }
  }
}
