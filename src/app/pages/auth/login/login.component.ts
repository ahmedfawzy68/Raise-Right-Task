import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { CustomBtnComponent } from '../../../shared/components/custom-btn/custom-btn.component';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CustomInputComponent, CustomBtnComponent, AuthHeaderComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
