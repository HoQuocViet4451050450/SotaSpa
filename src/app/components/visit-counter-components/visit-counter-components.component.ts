import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-counter-components',
  templateUrl: './visit-counter-components.component.html',
  styleUrls: ['./visit-counter-components.component.scss'],
})
export class VisitCounterComponentsComponent implements OnInit {
  visitCount = 0;
  showPopup = true;

  ngOnInit(): void {
    // Lấy số lượt truy cập từ Local Storage
    const count = localStorage.getItem('visitCount');
    this.visitCount = count ? parseInt(count, 10) + 1 : 1;
    localStorage.setItem('visitCount', this.visitCount.toString());

    // Hiển thị popup trong 5 giây nếu không tắt thủ công
    setTimeout(() => {
      this.showPopup = false;
    }, 5000);
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
