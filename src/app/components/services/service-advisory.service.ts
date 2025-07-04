import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServiceAdvisoryService {
  private baseUrl = 'https://sotaspa.onrender.com/api/advisory';
  private baseUrl2 = 'https://sotaspa.onrender.com/api/booking';
  constructor(private http: HttpClient) {}

  getPros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getadvisory`);
  }

  addPro(ad: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/postadvisory`, ad);
  }

  themLichDat(data: any) {
    return this.http.post<any>(`${this.baseUrl2}/add`, data);
  }

  layLichDat(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/`);
  }
}
