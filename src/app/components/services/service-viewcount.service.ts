import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ServiceViewcountService {
  private readonly STORAGE_KEY = 'visitCount';

  constructor() {}

  /**
   * Tăng số lượt truy cập lên 1 và lưu vào LocalStorage.
   * @returns Số lượt truy cập mới nhất.
   */
  incrementVisitCount(): number {
    let count = this.getVisitCount();
    count++;
    localStorage.setItem(this.STORAGE_KEY, count.toString());
    return count;
  }

  /**
   * Lấy số lượt truy cập hiện tại từ LocalStorage.
   * @returns Số lượt truy cập, mặc định là 0 nếu chưa có.
   */
  getVisitCount(): number {
    const storedCount = localStorage.getItem(this.STORAGE_KEY);
    return storedCount ? parseInt(storedCount, 10) : 0;
  }

  /**
   * Đặt lại số lượt truy cập về 0 trong LocalStorage.
   */
  resetVisitCount(): void {
    localStorage.setItem(this.STORAGE_KEY, '0');
    // Hoặc bạn có thể dùng: localStorage.removeItem(this.STORAGE_KEY);
    // Nếu bạn dùng removeItem, getVisitCount() sẽ trả về 0 mặc định khi không tìm thấy key.
  }
}
