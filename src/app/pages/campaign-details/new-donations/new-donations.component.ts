import { Component, Input } from '@angular/core';
import { donor } from '../../../core/interfaces/campaign';

@Component({
  selector: 'app-new-donations',
  imports: [],
  templateUrl: './new-donations.component.html',
  styleUrl: './new-donations.component.scss'
})
export class NewDonationsComponent {
  @Input() donations: donor[] | undefined;
}
