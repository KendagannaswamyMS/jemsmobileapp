import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  // events must come before the '' catch-all (prefix match swallows everything after it)
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NoPreloading
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
