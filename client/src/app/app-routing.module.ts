import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GatewayViewComponent } from './components/gateway-view/gateway-view.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/partials/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gateways/:gatewayId', component: GatewayViewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
