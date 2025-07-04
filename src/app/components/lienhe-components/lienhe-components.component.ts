import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-lienhe-components',
  templateUrl: './lienhe-components.component.html',
  styleUrls: ['./lienhe-components.component.css'],
})
export class LienheComponentsComponent {
  private map: any;

  ngOnInit(): void {
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
