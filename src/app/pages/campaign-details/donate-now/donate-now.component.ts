import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { CustomBtnComponent } from '../../../shared/components/custom-btn/custom-btn.component';

@Component({
  selector: 'app-donate-now',
  imports: [CustomInputComponent, CustomBtnComponent],
  templateUrl: './donate-now.component.html',
  styleUrl: './donate-now.component.scss'
})
export class DonateNowComponent {

}
