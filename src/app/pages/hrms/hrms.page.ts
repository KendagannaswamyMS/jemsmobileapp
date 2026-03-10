import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrms',
  templateUrl: './hrms.page.html',
  styleUrls: ['./hrms.page.scss'],
  standalone: false
})
export class HrmsPage {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
