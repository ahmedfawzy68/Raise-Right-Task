import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-btn',
  imports: [CommonModule],
  templateUrl: './custom-btn.component.html',
  styleUrl: './custom-btn.component.scss'
})
export class CustomBtnComponent {
  @Input() text: string = '';
  @Input() customStyle: any;
  @Input() iconImg: string = '';
  @Input() button: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
}
