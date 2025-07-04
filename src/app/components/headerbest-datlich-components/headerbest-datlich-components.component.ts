import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headerbest-datlich-components',
  templateUrl: './headerbest-datlich-components.component.html',
  styleUrls: ['./headerbest-datlich-components.component.css'],
})
export class HeaderbestDatlichComponentsComponent {
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
