import { Component, OnInit } from '@angular/core';
import { ServiceMenuService } from '../services/service-menu.service';
import { ServiceAdvisoryService } from '../services/service-advisory.service';

@Component({
  selector: 'app-datlich-components',
  templateUrl: './datlich-components.component.html',
  styleUrls: ['./datlich-components.component.css'],
})
export class DatlichComponentsComponent implements OnInit {
  danhSachDichVu: any[] = [];

  formData: any = {
    hovaten: '',
    sodienthoai: '',
    gioitinh: '',
    chinhanh: '',
    thoigiandatlich: '',
    khunggiophucvu: '',
    kythuatvien: '',
    dichvu_id: '',
    ghichu: '',
  };

  constructor(
    private serviceMenu: ServiceMenuService,
    private advisoryService: ServiceAdvisoryService
  ) {}

  ngOnInit(): void {
    this.serviceMenu.getTenDichVu().subscribe((res) => {
      this.danhSachDichVu = res;
    });
  }

  submitBooking() {
    console.log(this.formData); // 🧪 Xem trước dữ liệu gửi đi

    this.advisoryService.themLichDat(this.formData).subscribe({
      next: (res) => {
        alert('Đặt lịch thành công!');
        console.log('Thành công');
        this.resetForm(); // ✅ dùng hàm reset
      },
      error: (err) => {
        console.error(err);
        alert('Đặt lịch thất bại.');
      },
    });
  }

  // ✅ Thêm hàm reset form đúng chuẩn
  resetForm() {
    this.formData = {
      hovaten: '',
      sodienthoai: '',
      gioitinh: '',
      chinhanh: '',
      thoigiandatlich: '',
      khunggiophucvu: '',
      kythuatvien: '',
      dichvu_id: '',
      ghichu: '',
    };
  }
}
