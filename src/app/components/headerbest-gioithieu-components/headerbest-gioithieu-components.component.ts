import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headerbest-gioithieu-components',
  templateUrl: './headerbest-gioithieu-components.component.html',
  styleUrls: ['./headerbest-gioithieu-components.component.css'],
})
export class HeaderbestGioithieuComponentsComponent {
  menuActive = false;
  showAuthorTag = true;
  showAuthorTagNew = true;
  backgroundImage: string = '';
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }
}
