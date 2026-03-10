import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWorkloadPage } from './my-workload.page';

const routes: Routes = [
  { path: '', component: MyWorkloadPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorkloadPageRoutingModule {}
