import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular';
import {
  AlertToastModule,
  AuthModule,
  FilterPopoverComponent,
  FilterPopoverModule,
  HeadingModule
} from 'cr-lib';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AlertToastModule,
    AppRoutingModule,
    AuthModule,
    FilterPopoverModule,
    HeadingModule,
    HttpClientModule
  ],
  entryComponents: [
    FilterPopoverComponent
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
