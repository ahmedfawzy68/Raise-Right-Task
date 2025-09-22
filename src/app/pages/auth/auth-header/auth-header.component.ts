import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  imports: [],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.scss'
})
export class AuthHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';

}
