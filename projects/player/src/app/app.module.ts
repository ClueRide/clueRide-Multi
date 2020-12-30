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
  BadgeAwardComponent,
  BadgeAwardModule,
  ConnectionExplainPageModule
} from 'cr-lib';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {OutingPageModule} from './outing-page/outing.module';
import {OutingSummaryModule} from './outing-summary/outing-summary.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    BadgeAwardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AlertToastModule,
    AppRoutingModule,
    AuthModule,
    BadgeAwardModule,
    ConnectionExplainPageModule,
    HttpClientModule,
    OutingPageModule,
    OutingSummaryModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
