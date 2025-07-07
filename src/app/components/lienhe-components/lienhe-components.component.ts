import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-lienhe-components',
  templateUrl: './lienhe-components.component.html',
  styleUrls: ['./lienhe-components.component.scss'],
})
export class LienheComponentsComponent {
  private map: any;
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    // Thiết lập SEO động
    this.titleService.setTitle('Liên hệ Sota Spa – Tư vấn và Đặt lịch');
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Liên hệ Sota Spa để được tư vấn liệu trình, đặt lịch hẹn hoặc hợp tác. Chúng tôi luôn sẵn sàng lắng nghe và phục vụ bạn.',
      },
      {
        name: 'keywords',
        content:
          'Liên hệ Sota Spa, Đặt lịch spa, Tư vấn làm đẹp, Sota Spa hỗ trợ khách hàng, Gọi spa, Địa chỉ Sota Spa',
      },
      { name: 'author', content: 'Sota Spa' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Liên hệ – Sota Spa & Beauty' },
      {
        property: 'og:description',
        content:
          'Gọi ngay hoặc gửi yêu cầu để được Sota Spa tư vấn chi tiết về các dịch vụ làm đẹp, massage và chăm sóc da.',
      },
      {
        property: 'og:image',
        content: 'https://hungvietphat.io.vn/assets/images/LogoNewR.jpg',
      },
      {
        property: 'og:url',
        content: 'https://hungvietphat.io.vn/#/lien-he',
      },
      { property: 'og:type', content: 'website' },
    ]);
    // Tọa độ địa điểm (135/3 Thành Thái, Quy Nhơn, Bình Định)
    const targetCoords: L.LatLngExpression = [
      13.763319482353474, 109.20244596207611,
    ]; // Có thể tinh chỉnh lại

    this.map = L.map('map').setView(targetCoords, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Tạo icon tùy chỉnh
    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-icon">
           <i class="fas fa-map-marker-alt"></i>
         </div>`,
      iconSize: [100, 100],
      iconAnchor: [16, 40],
    });

    // Thêm marker với icon
    L.marker(targetCoords, { icon: customIcon })
      .addTo(this.map)
      .bindPopup(
        '<b>Hưng Việt Phát Tech </b>135/3 Thành Thái</b><br>Quang Trung, Quy Nhơn, Bình Định'
      )
      .openPopup();
  }
}
