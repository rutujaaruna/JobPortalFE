import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [AppComponent, LandingPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
