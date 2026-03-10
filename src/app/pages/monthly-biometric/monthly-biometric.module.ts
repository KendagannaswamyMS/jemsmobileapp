import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MonthlyBiometricPageRoutingModule } from './monthly-biometric-routing.module';
import { MonthlyBiometricPage } from './monthly-biometric.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MonthlyBiometricPageRoutingModule],
  declarations: [MonthlyBiometricPage]
})
export class MonthlyBiometricPageModule {}
