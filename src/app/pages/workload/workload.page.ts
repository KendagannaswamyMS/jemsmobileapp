import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workload',
  templateUrl: './workload.page.html',
  styleUrls: ['./workload.page.scss'],
  standalone: false
})
export class WorkloadPage {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
