import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServicePromotionService {
  private baseUrl = 'https://sotaspa.onrender.com/api/promotion';

  constructor(private http: HttpClient) {}

  getPros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getpromotions`);
  }

  addPro(pro: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/postpromotion`, pro);
  }

  updatePro(id: number, pro: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatepromotion/${id}`, pro);
  }

  deletePro(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletepromotion/${id}`);
  }

  likePro(proId: number) {
    return this.http.put(`${this.baseUrl}/likepromotion/${proId}`, {});
  }

  getProDetail(proId: number) {
    return this.http.get(`${this.baseUrl}/getpromotion/${proId}`, {});
  }
}
