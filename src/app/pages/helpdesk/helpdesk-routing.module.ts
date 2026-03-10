import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpdeskPage } from './helpdesk.page';

const routes: Routes = [
  { path: '', component: HelpdeskPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskPageRoutingModule {}
