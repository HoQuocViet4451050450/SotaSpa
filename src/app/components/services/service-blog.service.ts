import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServiceBlogService {
  private baseUrl = 'https://sotaspa.onrender.com/api/blog';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getblogs`);
  }

  addBlog(blog: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/postblog`, blog);
  }

  updateBlog(id: number, blog: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateblog/${id}`, blog);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteblog/${id}`);
  }

  likeBlog(blogId: number) {
    return this.http.put(`${this.baseUrl}/likeblog/${blogId}`, {});
  }

  getBlogDetail(blogId: number) {
    return this.http.get(`${this.baseUrl}/getblog/${blogId}`, {});
  }
}
