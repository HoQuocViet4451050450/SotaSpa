import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceMenuService {
  private baseUrl = 'https://sotaspa.onrender.com/api/menu';

  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dichvu`);
  }

  getTenDichVu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tendichvu`);
  }

  addDichVu(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/dichvu`, data);
  }

  updateDichVu(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/dichvu/${id}`, data);
  }

  deleteDichVu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/dichvu/${id}`);
  }

  addGoiDichVu(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/goidichvu`, data);
  }

  updateGoiDichVu(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/goidichvu/${id}`, data);
  }

  deleteGoiDichVu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/goidichvu/${id}`);
  }
}
