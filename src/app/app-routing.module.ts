import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component:LandingPageComponent},
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
