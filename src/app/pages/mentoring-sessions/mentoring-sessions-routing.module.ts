import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentoringSessionsPage } from './mentoring-sessions.page';

const routes: Routes = [
  { path: '', component: MentoringSessionsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentoringSessionsPageRoutingModule {}
