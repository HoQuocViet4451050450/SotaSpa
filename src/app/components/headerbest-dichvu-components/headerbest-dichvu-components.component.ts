import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headerbest-dichvu-components',
  templateUrl: './headerbest-dichvu-components.component.html',
  styleUrls: ['./headerbest-dichvu-components.component.scss'],
})
export class HeaderbestDichvuComponentsComponent {
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
