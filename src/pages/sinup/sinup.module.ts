import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinupPage } from './sinup';
import { AuthService } from '../../providers/auth/auth-service';

@NgModule({
  declarations: [
    SinupPage,
  ],
  imports: [
    IonicPageModule.forChild(SinupPage)
  ],
  providers: [
   AuthService
  ]
})
export class SinupPageModule {}
