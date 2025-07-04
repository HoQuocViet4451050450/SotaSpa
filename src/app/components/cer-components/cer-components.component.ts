import { Component } from '@angular/core';

@Component({
  selector: 'app-cer-components',
  templateUrl: './cer-components.component.html',
  styleUrls: ['./cer-components.component.css'],
})
export class CerComponentsComponent {
  certifications = [
    {
      name: 'INTERNATIONAL SPA ASSOCIATION (ISPA)',
      year: 2024,
      description:
        'Sota Spa vinh dự nhận được chứng nhận từ INTERNATIONAL SPA ASSOCIATION (ISPA) nhờ vào chất lượng dịch vụ vượt trội, đội ngũ chuyên nghiệp và quy trình chăm sóc khách hàng chuẩn quốc tế.',
      imageUrl: 'assets/images/SpaCe.png',
    },
    {
      name: 'ASEAN Spa Services Standard',
      year: 2023,
      description: 'Chứng nhận đạt chuẩn dịch vụ spa trong khu vực Đông Nam Á.',
      imageUrl: 'assets/images/SpaCe.png',
    },
  ];
}
