import { Component } from '@angular/core';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomBtnComponent } from '../custom-btn/custom-btn.component';

@Component({
  selector: 'app-new-campaigns',
  imports: [CustomInputComponent, CustomBtnComponent],
  templateUrl: './new-campaigns.component.html',
  styleUrl: './new-campaigns.component.scss'
})
export class NewCampaignsComponent {

}
