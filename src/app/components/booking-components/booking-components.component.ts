import { Component, OnInit } from '@angular/core';
import { ServiceMenuService } from '../services/service-menu.service';
import { ServiceAdvisoryService } from '../services/service-advisory.service';

@Component({
  selector: 'app-booking-components',
  templateUrl: './booking-components.component.html',
  styleUrls: ['./booking-components.component.scss'],
})
export class BookingComponentsComponent implements OnInit {
  danhSachDichVu: any[] = [];

  form: {
    tenkhachhang: string;
    sodienthoai: string;
    email: string;
    dichvu_id: string;
    chinhanh: string;
    thoigian: string;
  } = {
    tenkhachhang: '',
    sodienthoai: '',
    email: '',
    dichvu_id: '',
    chinhanh: '',
    thoigian: '',
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

  datLich(): void {
    if (this.isFormValid()) {
      this.advisoryService.addPro(this.form).subscribe({
        next: (res) => {
          alert('Đặt lịch thành công!');
          this.resetForm();
        },
        error: (err) => {
          console.error('Lỗi đặt lịch:', err);
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        },
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }

  isFormValid(): boolean {
    return (
      this.form.tenkhachhang.trim() !== '' &&
      this.form.sodienthoai.trim() !== '' &&
      this.form.email.trim() !== '' &&
      this.form.dichvu_id.trim() !== '' &&
      this.form.chinhanh.trim() !== '' &&
      this.form.thoigian.trim() !== ''
    );
  }

  resetForm(): void {
    this.form = {
      tenkhachhang: '',
      sodienthoai: '',
      email: '',
      dichvu_id: '',
      chinhanh: '',
      thoigian: '',
    };
  }
}
