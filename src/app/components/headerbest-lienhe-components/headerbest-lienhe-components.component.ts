import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headerbest-lienhe-components',
  templateUrl: './headerbest-lienhe-components.component.html',
  styleUrls: ['./headerbest-lienhe-components.component.css'],
})
export class HeaderbestLienheComponentsComponent {
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
