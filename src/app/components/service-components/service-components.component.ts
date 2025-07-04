import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBlogService } from '../services/service-blog.service';
import { ServiceIdEncoderServiceService } from '../services/service-id-encoder-service.service';
@Component({
  selector: 'app-service-components',
  templateUrl: './service-components.component.html',
  styleUrls: ['./service-components.component.css'],
})
export class ServiceComponentsComponent implements OnInit {
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

  goToBlogDetail(id: number) {
    const encodedId = this.idEncoderService.encodeId(id);

    this.router.navigate(['/blogdetail', encodedId]);
  }

  onSubmit(): void {}
}
