import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
// import config from '../../capacitor.config.json';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from '../providers/interceptors/headers.interceptor';
import { HttpErrorInterceptor } from '../providers/interceptors/httperror.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicSelectableModule } from 'ionic-selectable';

const redirectUri = `http://localhost:8100/#/pages/root/inicio`;

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    IonicSelectableModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AuthModule.forRoot({
      domain: 'coexpancl.us.auth0.com',
      clientId: 'PL7eS9srXFJukuJ8AX0L43AUiJ92yL6s',
      cacheLocation: 'localstorage',
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy, },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
