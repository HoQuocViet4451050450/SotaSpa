import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceIntroductionService {
  private baseUrl = 'https://sotaspa.onrender.com/api/introduction';

  constructor(private http: HttpClient) {}

  // Introduction APIs
  getIntroductions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getintros`);
  }

  addIntroduction(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/postintro`, data);
  }

  updateIntroduction(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateintro/${id}`, data);
  }

  deleteIntroduction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteintro/${id}`);
  }
}
