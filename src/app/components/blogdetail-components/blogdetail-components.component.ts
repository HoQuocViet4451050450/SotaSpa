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
  styleUrls: ['./blogdetail-components.component.scss'],
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

  ngOnInit(): void {
    // Use paramMap with switchMap for a reactive approach to route parameters.
    // This is better than snapshot if the component can be reused with different IDs.
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          // Get the 'encodedId' from the route parameters.
          // Remember to update your routing module to use 'encodedId' instead of 'id'.
          const encodedId = params.get('encodedId');

          if (encodedId) {
            // Decode the encoded string back to the original numeric ID
            const originalId = this.idEncoderService.decodeId(encodedId);

            if (originalId !== null) {
              this.isLoading = true; // Set loading to true before fetching
              // If decoding is successful, call your service to get blog details
              return this.Service.getBlogDetail(originalId);
            } else {
              console.error(`Error: Could not decode encoded ID: ${encodedId}`);
              // Handle invalid encoded ID, e.g., redirect to a 404 page or blog list
              this.router.navigate(['/blog']); // Example: Redirect to blog list
              return of(null); // <--- Changed from require('rxjs').of(null) to of(null)
            }
          } else {
            console.error('Error: No encoded ID found in route parameters.');
            // Handle missing encoded ID, e.g., redirect to a 404 page or blog list
            this.router.navigate(['/blog']); // Example: Redirect to blog list
            return of(null); // <--- Changed from require('rxjs').of(null) to of(null)
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.blog = data;
          } else {
            // This block will be hit if an error occurred in switchMap and returned null
            this.blog = null; // Ensure blog is null if data is not found/decoded
          }
          this.isLoading = false; // Set loading to false after data is received (or not)
        },
        error: (err) => {
          console.error('Lỗi khi lấy blog chi tiết:', err);
          this.blog = null; // Clear blog data on error
          this.isLoading = false; // Set loading to false on error
          // Optionally, redirect or show an error message to the user
          this.router.navigate(['/blog']); // Example: Redirect on API error
        },
      });
  }
}
