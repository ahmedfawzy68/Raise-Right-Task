import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  links = [
    {
      title: 'Product', items: [
        { name: 'Overview', isNew: false },
        { name: 'Features', isNew: false },
        { name: 'Solutions', isNew: true },
        { name: 'Tutorials', isNew: false },
        { name: 'Pricing', isNew: false },
        { name: 'Releases', isNew: false }
      ]
    },
    {
      title: 'Company', items: [
        { name: 'About', isNew: false },
        { name: 'Press', isNew: false },
        { name: 'Careers', isNew: false },
        { name: 'News', isNew: false },
        { name: 'Media kit', isNew: false },
        { name: 'Contact', isNew: false }
      ]
    },
    {
      title: 'Resources', items: [
        { name: 'Blog', isNew: false },
        { name: 'Newsletter', isNew: false },
        { name: 'Events', isNew: false },
        { name: 'Help center', isNew: false },
        { name: 'Tutorials', isNew: false },
        { name: 'Support', isNew: false }
      ]
    },
    {
      title: 'Legal', items: [
        { name: 'Terms', isNew: false },
        { name: 'Privacy', isNew: false },
        { name: 'Cookies', isNew: false },
        { name: 'Licenses', isNew: false },
        { name: 'Settings', isNew: false },
        { name: 'Contact', isNew: false }
      ]
    }
  ]

}
