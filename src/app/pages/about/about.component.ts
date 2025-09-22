import { Component } from '@angular/core';
import { CustomBtnComponent } from '../../shared/components/custom-btn/custom-btn.component';

@Component({
  selector: 'app-about',
  imports: [CustomBtnComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
