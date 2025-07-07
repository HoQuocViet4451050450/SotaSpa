import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headerbest-khuyenmai-components',
  templateUrl: './headerbest-khuyenmai-components.component.html',
  styleUrls: ['./headerbest-khuyenmai-components.component.scss'],
})
export class HeaderbestKhuyenmaiComponentsComponent {
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
