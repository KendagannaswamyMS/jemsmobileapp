import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedCoursesPage } from './assigned-courses.page';

const routes: Routes = [
  { path: '', component: AssignedCoursesPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedCoursesPageRoutingModule {}
