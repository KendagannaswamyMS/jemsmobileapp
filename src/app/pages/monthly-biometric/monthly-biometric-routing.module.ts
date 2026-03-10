import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyBiometricPage } from './monthly-biometric.page';

const routes: Routes = [
  { path: '', component: MonthlyBiometricPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyBiometricPageRoutingModule {}
