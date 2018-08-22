import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FIREBASECRED } from './firebase.credentials';
import { TaskProvider } from '../providers/task/task';
import { SinginPage } from '../pages/singin/singin';
import { AuthService } from '../providers/auth/auth-service';
import { SinupPage } from '../pages/sinup/sinup';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SinginPage,
    SinupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASECRED),
    AngularFireDatabaseModule,AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SinginPage,
    SinupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TaskProvider,AuthService
  ]
})
export class AppModule {}
