import { Component } from '@angular/core';
import { CustomBtnComponent } from '../custom-btn/custom-btn.component';
import { DrawerComponent } from './drawer/drawer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CustomBtnComponent, DrawerComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDrawerOpen = false;

  openDrawer(): void {
    this.isDrawerOpen = true;
    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    document.body.style.overflow = 'auto';
  }
}
