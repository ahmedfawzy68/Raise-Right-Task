import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomBtnComponent } from '../../custom-btn/custom-btn.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drawer',
  imports: [CustomBtnComponent, RouterModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  @Input() isDrawerOpen = false;
  @Output() drawerClosed = new EventEmitter<void>();

  closeDrawer(): void {
    this.drawerClosed.emit();
  }
}
