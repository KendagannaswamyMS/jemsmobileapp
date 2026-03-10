import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AssignedCoursesPageRoutingModule } from './assigned-courses-routing.module';
import { AssignedCoursesPage } from './assigned-courses.page';

@NgModule({
  imports: [CommonModule, IonicModule, AssignedCoursesPageRoutingModule],
  declarations: [AssignedCoursesPage]
})
export class AssignedCoursesPageModule {}
