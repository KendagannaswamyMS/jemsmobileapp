import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MyWorkloadPageRoutingModule } from './my-workload-routing.module';
import { MyWorkloadPage } from './my-workload.page';

@NgModule({
  imports: [CommonModule, IonicModule, MyWorkloadPageRoutingModule],
  declarations: [MyWorkloadPage]
})
export class MyWorkloadPageModule {}
