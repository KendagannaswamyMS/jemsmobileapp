import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.page.html',
  styleUrls: ['./helpdesk.page.scss'],
  standalone: false
})
export class HelpdeskPage {
  constructor(private router: Router, private location: Location) {}

  goBack() { this.location.back(); }

  goTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
