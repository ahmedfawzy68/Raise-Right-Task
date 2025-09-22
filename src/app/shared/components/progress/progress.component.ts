import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  @Input() progress: number = 0;

  get normalizedProgress(): number {
    return Math.min(Math.max(this.progress, 0), 100);
  }
}
