import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-auth-components',
  templateUrl: './auth-components.component.html',
  styleUrls: ['./auth-components.component.css'],
})
export class AuthComponentsComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Thiết kế Website Chuẩn SEO - My Company');
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Dịch vụ thiết kế website chuẩn SEO, thân thiện với thiết bị di động, bảo mật cao. Liên hệ ngay để được tư vấn miễn phí nhé.',
      },
      {
        name: 'keywords',
        content:
          'thiết kế website, web chuẩn SEO, web giá rẻ, responsive, bảo mật website',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'My Company' },
    ]);
  }
}
