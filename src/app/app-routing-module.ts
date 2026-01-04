import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { DashboardComponent } from './dashboard/dashboard';
import { Contact } from './contact/contact';

const routes: Routes = [
  { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },

  {
    path: 'home',
    component: Home,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'contact',
        component: Contact,
      },
    ],
  },

  { path: '**', redirectTo: '/home/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
