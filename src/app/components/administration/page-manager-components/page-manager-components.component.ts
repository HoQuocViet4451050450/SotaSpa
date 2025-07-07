import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceAdvisoryService } from '../../services/service-advisory.service';
import { ServiceBlogService } from '../../services/service-blog.service';
import { ServiceMenuService } from '../../services/service-menu.service';
import { ServicePromotionService } from '../../services/service-promotion.service';

@Component({
  selector: 'app-page-manager-components',
  templateUrl: './page-manager-components.component.html',
  styleUrls: ['./page-manager-components.component.scss'],
})
export class PageManagerComponentsComponent implements OnInit {
  activeSection: string = 'baiviet';
  advisoryList: any[] = [];
  bookingList: any[] = [];
  // Blog
  formData: any;
  blogList: any[] = [];

  // Promotion
  promotionForm: any;
  promotionList: any[] = [];

  // Dịch vụ
  dichvus: any[] = [];
  newDichVu = { tendichvu: '', mota: '' };
  newGoi = { tengoi: '', solan: 1, gia: 0, dichvu_id: null as number | null };

  editingDichVu: any = null;
  editingGoi: any = null;

  constructor(
    private serviceBlog: ServiceBlogService,
    private serviceMenu: ServiceMenuService,
    private servicePromotion: ServicePromotionService,
    private serviceAdvisory: ServiceAdvisoryService,

    private fb: FormBuilder
  ) {
    this.promotionForm = this.getEmptyPromotionForm();
  }

  ngOnInit(): void {
    this.formData = this.getEmptyForm();
    this.loadBlogs();
    this.loadDichVu();
    this.loadPromotions();
    this.loadAdvisoryList();
    this.loadBookingList();
  }

  // ------------------ BLOG ------------------
  getEmptyForm() {
    return {
      id: null,
      nguoidang: '',
      tieude: '',
      tieudephu: '',
      ngaydang: '',
      luotxem: 0,
      luotthich: 0,
      noidung: '',
      hinhanh: '',
      duonglink: '',
      lienhe: '',
    };
  }

  loadBlogs(): void {
    this.serviceBlog.getBlogs().subscribe((data) => (this.blogList = data));
  }

  onSubmit(): void {
    this.formData.id ? this.updateBlog() : this.addBlog();
  }

  addBlog(): void {
    this.serviceBlog.addBlog(this.formData).subscribe(() => {
      this.loadBlogs();
      this.resetForm();
    });
  }

  updateBlog(): void {
    this.serviceBlog
      .updateBlog(this.formData.id, this.formData)
      .subscribe(() => {
        this.loadBlogs();
        this.resetForm();
      });
  }

  editBlog(blog: any): void {
    this.formData = { ...blog };
    this.formatDateField('formData', 'ngaydang');
  }

  deleteBlog(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      this.serviceBlog.deleteBlog(id).subscribe(() => this.loadBlogs());
    }
  }

  resetForm(): void {
    this.formData = this.getEmptyForm();
  }
  // ------------------ LICHHEN ------------------

  loadAdvisoryList(): void {
    this.serviceAdvisory.getPros().subscribe((data) => {
      this.advisoryList = data;
    });
  }
  // ------------------ LICHBOOKING ------------------

  loadBookingList(): void {
    this.serviceAdvisory.layLichDat().subscribe((data) => {
      this.bookingList = data;
    });
  }
  // ------------------ DICHVU ------------------
  loadDichVu(): void {
    this.serviceMenu.getAll().subscribe((res) => {
      const grouped: any = {};
      res.forEach((item) => {
        if (!grouped[item.dichvu_id]) {
          grouped[item.dichvu_id] = {
            id: item.dichvu_id,
            tendichvu: item.tendichvu,
            mota: item.mota,
            gois: [],
          };
        }
        if (item.goi_id) {
          grouped[item.dichvu_id].gois.push({
            id: item.goi_id,
            tengoi: item.tengoi,
            solan: item.solan,
            gia: item.gia,
          });
        }
      });
      this.dichvus = Object.values(grouped);
    });
  }

  addDichVu(): void {
    this.serviceMenu.addDichVu(this.newDichVu).subscribe(() => {
      this.newDichVu = { tendichvu: '', mota: '' };
      this.loadDichVu();
    });
  }

  updateDichVu(dv: any): void {
    this.serviceMenu.updateDichVu(dv.id, dv).subscribe(() => {
      this.editingDichVu = null;
      this.loadDichVu();
    });
  }

  deleteDichVu(id: number): void {
    if (confirm('Xóa dịch vụ này?')) {
      this.serviceMenu.deleteDichVu(id).subscribe(() => this.loadDichVu());
    }
  }

  addGoiDichVuFor(dvId: number): void {
    this.newGoi.dichvu_id = dvId;

    const { tengoi, solan, gia, dichvu_id } = this.newGoi;
    if (!tengoi || !solan || !gia || !dichvu_id) {
      alert('⚠️ Vui lòng nhập đủ thông tin');
      return;
    }

    this.serviceMenu.addGoiDichVu(this.newGoi).subscribe({
      next: () => {
        alert('✅ Thêm gói thành công');
        this.newGoi = { tengoi: '', solan: 1, gia: 0, dichvu_id: null };
        this.loadDichVu();
      },
      error: (err) => {
        console.error('❌ Lỗi khi thêm:', err);
        alert('❌ Lỗi khi thêm gói');
      },
    });
  }

  updateGoi(goi: any): void {
    this.serviceMenu.updateGoiDichVu(goi.id, goi).subscribe(() => {
      this.editingGoi = null;
      this.loadDichVu();
    });
  }

  deleteGoi(id: number): void {
    if (confirm('Xóa gói dịch vụ này?')) {
      this.serviceMenu.deleteGoiDichVu(id).subscribe(() => this.loadDichVu());
    }
  }

  startEditDichVu(dv: any): void {
    this.editingDichVu = { ...dv };
  }

  startEditGoi(goi: any): void {
    this.editingGoi = { ...goi };
  }

  // ------------------ PROMOTION ------------------
  getEmptyPromotionForm() {
    return {
      id: null,
      tieude: '',
      tieudephu: '',
      noidung: '',
      hinhanh: '',
      ngaydang: '',
      duonglink: '',
      lienhe: '',
      luotxem: 0,
      luotthich: 0,
    };
  }

  loadPromotions(): void {
    this.servicePromotion.getPros().subscribe((data) => {
      this.promotionList = data;
    });
  }

  submitPromotion(): void {
    this.promotionForm.id ? this.updatePromotion() : this.addPromotion();
  }

  addPromotion(): void {
    this.servicePromotion.addPro(this.promotionForm).subscribe(() => {
      this.loadPromotions();
      this.resetPromotionForm();
    });
  }

  updatePromotion(): void {
    this.servicePromotion
      .updatePro(this.promotionForm.id, this.promotionForm)
      .subscribe(() => {
        this.loadPromotions();
        this.resetPromotionForm();
      });
  }

  editPromotion(promotion: any): void {
    this.promotionForm = { ...promotion };
    this.formatDateField('promotionForm', 'ngaydang');
  }

  deletePromotion(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa promotion này?')) {
      this.servicePromotion.deletePro(id).subscribe(() => {
        this.loadPromotions();
      });
    }
  }

  resetPromotionForm(): void {
    this.promotionForm = this.getEmptyPromotionForm();
  }

  // ------------------ UTILITY ------------------
  private formatDateField(
    target: 'formData' | 'promotionForm',
    field: string
  ): void {
    const value = this[target].get
      ? this[target].get(field)?.value
      : this[target][field];

    if (value?.includes('T')) {
      const formatted = value.split('T')[0];
      if (this[target].patchValue) {
        this[target].patchValue({ [field]: formatted });
      } else {
        this[target][field] = formatted;
      }
    }
  }
}
