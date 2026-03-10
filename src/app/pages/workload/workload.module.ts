import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WorkloadPageRoutingModule } from './workload-routing.module';
import { WorkloadPage } from './workload.page';

@NgModule({
  imports: [CommonModule, IonicModule, WorkloadPageRoutingModule],
  declarations: [WorkloadPage]
})
export class WorkloadPageModule {}
