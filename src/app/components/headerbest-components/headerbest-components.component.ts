import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceViewcountService } from '../services/service-viewcount.service';

@Component({
  selector: 'app-headerbest-components',
  templateUrl: './headerbest-components.component.html',
  styleUrls: ['./headerbest-components.component.css'],
})
export class HeaderbestComponentsComponent implements OnInit {
  menuActive = false;
  showAuthorTag = true;
  showAuthorTagNew = true;
  showAuthorTagNew1 = true;
  backgroundImage: string = '';
  visitCount: number = 0;
  private readonly RESET_KEY = '123'; // Mã key để reset

  constructor(
    private counterService: ServiceViewcountService,
    private router: Router
  ) {}
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const contactInfo = document.querySelector('.contact-info');
    const contactInfoHeight = contactInfo?.getBoundingClientRect().bottom || 0;
    this.isScrolled = contactInfoHeight <= 0;
  }

  ngOnInit(): void {
    this.onWindowScroll(); // kiểm tra ngay lần đầu load
    this.visitCount = this.counterService.incrementVisitCount();
  }

  resetCount(): void {
    // Yêu cầu người dùng nhập mã key
    const enteredKey = prompt('Vui lòng nhập mã key để đặt lại số lượt xem:');

    // Kiểm tra mã key
    if (enteredKey === this.RESET_KEY) {
      this.counterService.resetVisitCount();
      this.visitCount = this.counterService.getVisitCount(); // Cập nhật lại số hiển thị trên UI
      alert('Số lượt xem đã được đặt lại thành công!');
    } else if (enteredKey !== null) {
      // Nếu người dùng nhập nhưng sai
      alert('Mã key không đúng. Vui lòng thử lại.');
    }
    // Nếu người dùng nhấn Cancel (enteredKey là null) thì không làm gì cả
  }
}
