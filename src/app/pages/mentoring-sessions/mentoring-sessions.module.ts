import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MentoringSessionsPageRoutingModule } from './mentoring-sessions-routing.module';
import { MentoringSessionsPage } from './mentoring-sessions.page';

@NgModule({
  imports: [CommonModule, IonicModule, MentoringSessionsPageRoutingModule],
  declarations: [MentoringSessionsPage]
})
export class MentoringSessionsPageModule {}
