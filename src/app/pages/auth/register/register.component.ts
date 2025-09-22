import { Component } from '@angular/core';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { CustomBtnComponent } from '../../../shared/components/custom-btn/custom-btn.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [AuthHeaderComponent, CustomInputComponent, CustomBtnComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
