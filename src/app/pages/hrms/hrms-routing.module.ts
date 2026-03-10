import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrmsPage } from './hrms.page';

const routes: Routes = [
  { path: '', component: HrmsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmsPageRoutingModule {}
