import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HrmsPageRoutingModule } from './hrms-routing.module';
import { HrmsPage } from './hrms.page';

@NgModule({
  imports: [CommonModule, IonicModule, HrmsPageRoutingModule],
  declarations: [HrmsPage]
})
export class HrmsPageModule {}
